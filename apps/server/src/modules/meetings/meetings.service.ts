import { customAlphabet } from "nanoid";
import { getDatabase, meetings, meetingParticipants, auditLogs, eq } from "@talkive/database";
import { env } from "../../config/env.js";
import { LiveKitService } from "../rooms/livekit.service.js";
import type {
  CreateMeetingRequest,
  JoinMeetingRequest,
  MeetingDetails,
  MeetingParticipant,
  ParticipantPermissions,
  MeetingRole,
} from "@talkive/types";

// Generates friendly room codes: "abc-defg-hij"
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const nanoidLetters = customAlphabet(alphabet, 3);
const nanoidMiddle = customAlphabet(alphabet, 4);

export function generateRoomCode(): string {
  return `${nanoidLetters()}-${nanoidMiddle()}-${nanoidLetters()}`;
}

export class MeetingsService {
  private static db = getDatabase(env.DATABASE_URL);

  static async createMeeting(userId: string, data: CreateMeetingRequest): Promise<MeetingDetails> {
    const roomCode = generateRoomCode();

    const [meeting] = await this.db
      .insert(meetings)
      .values({
        roomCode,
        title: data.title,
        description: data.description,
        hostId: userId,
        mode: data.mode || "general",
        accessType: data.accessType || "open",
        settings: data.settings || {},
        isLive: false,
        scheduledStartTime: data.scheduledStartTime ? new Date(data.scheduledStartTime) : null,
        scheduledEndTime: data.scheduledEndTime ? new Date(data.scheduledEndTime) : null,
      })
      .returning();

    if (!meeting) {
      throw new Error("Failed to create meeting");
    }

    return {
      ...meeting,
      id: meeting.id,
      roomCode: meeting.roomCode,
      title: meeting.title,
      description: meeting.description,
      hostId: meeting.hostId,
      mode: meeting.mode as any,
      accessType: meeting.accessType as any,
      settings: meeting.settings as any,
      isLive: meeting.isLive,
      startedAt: meeting.startedAt?.toISOString() || null,
      endedAt: meeting.endedAt?.toISOString() || null,
      scheduledStartTime: meeting.scheduledStartTime?.toISOString() || null,
      scheduledEndTime: meeting.scheduledEndTime?.toISOString() || null,
      createdAt: meeting.createdAt.toISOString(),
    };
  }

  static async getMeetingByCode(roomCode: string): Promise<MeetingDetails | null> {
    const meeting = await this.db.query.meetings.findFirst({
      where: eq(meetings.roomCode, roomCode.toLowerCase()),
    });

    if (!meeting) return null;

    return {
      ...meeting,
      id: meeting.id,
      roomCode: meeting.roomCode,
      title: meeting.title,
      description: meeting.description,
      hostId: meeting.hostId,
      mode: meeting.mode as any,
      accessType: meeting.accessType as any,
      settings: meeting.settings as any,
      isLive: meeting.isLive,
      startedAt: meeting.startedAt?.toISOString() || null,
      endedAt: meeting.endedAt?.toISOString() || null,
      scheduledStartTime: meeting.scheduledStartTime?.toISOString() || null,
      scheduledEndTime: meeting.scheduledEndTime?.toISOString() || null,
      createdAt: meeting.createdAt.toISOString(),
    };
  }

  static async joinMeeting(
    roomCode: string,
    data: JoinMeetingRequest,
    authenticatedUserId?: string
  ) {
    const meeting = await this.getMeetingByCode(roomCode);
    if (!meeting) {
      throw new Error("Meeting not found");
    }

    if (meeting.endedAt) {
      throw new Error("This meeting has already ended");
    }

    // Access type validation
    if (meeting.accessType === "passcode_protected") {
      const settings = meeting.settings as any;
      if (settings.passcode && settings.passcode !== data.passcode) {
        throw new Error("Invalid meeting passcode");
      }
    }

    const isHost = authenticatedUserId && authenticatedUserId === meeting.hostId;
    let role: MeetingRole = isHost ? "host" : "participant";
    let isGhost = false;

    // Ghost Mode check (only allowed for host/instructors or explicit supervisors)
    if (data.isGhostRequested) {
      if (!isHost) {
        throw new Error("Unauthorized: Only verified hosts or supervisors can enter in Ghost Mode");
      }
      role = "ghost";
      isGhost = true;
    }

    const permissions: ParticipantPermissions = {
      canPublishAudio: !isGhost,
      canPublishVideo: !isGhost,
      canScreenShare: !isGhost,
      canChat: !isGhost,
      canUseWhiteboard: !isGhost,
      canEditCode: !isGhost,
      canStartPoll: Boolean(isHost),
      canMuteOthers: Boolean(isHost),
      canKickOthers: Boolean(isHost),
      isGhost,
    };

    const participantIdentity = authenticatedUserId || `guest_${customAlphabet(alphabet, 8)()}`;

    // Record in DB
    const [participantRecord] = await this.db
      .insert(meetingParticipants)
      .values({
        meetingId: meeting.id,
        userId: authenticatedUserId || null,
        displayName: data.displayName,
        role,
        permissions,
        isGhost,
      })
      .returning();

    // If Ghost Mode, write to immutable audit log for compliance
    if (isGhost) {
      await this.db.insert(auditLogs).values({
        meetingId: meeting.id,
        actorId: participantIdentity,
        actorRole: "ghost",
        action: "ghost_joined_meeting",
        metadata: { displayName: data.displayName, roomCode },
      });
    }

    // Generate LiveKit Token
    const livekitToken = await LiveKitService.createToken({
      roomName: meeting.roomCode,
      participantIdentity,
      participantName: data.displayName,
      role,
      permissions,
      isGhost,
      metadata: {
        meetingId: meeting.id,
        mode: meeting.mode,
      },
    });

    const participant: MeetingParticipant = {
      id: participantIdentity,
      userId: authenticatedUserId,
      name: data.displayName,
      role,
      permissions,
      isAudioMuted: false,
      isVideoMuted: false,
      isScreenSharing: false,
      isHandRaised: false,
      handRaisedAt: null,
      joinedAt: new Date().toISOString(),
    };

    return {
      meeting,
      participant,
      livekitToken,
      livekitUrl: env.LIVEKIT_URL,
      signalingUrl: `${env.API_URL.replace("http://", "ws://").replace("https://", "wss://")}/ws/signaling`,
    };
  }
}
