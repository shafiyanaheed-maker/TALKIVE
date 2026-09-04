import { AccessToken, RoomServiceClient, WebhookReceiver } from "livekit-server-sdk";
import { env } from "../../config/env.js";
import type { MeetingRole, ParticipantPermissions } from "@talkive/types";

export class LiveKitService {
  private static roomService = new RoomServiceClient(
    env.LIVEKIT_URL.replace("ws://", "http://").replace("wss://", "https://"),
    env.LIVEKIT_API_KEY,
    env.LIVEKIT_API_SECRET
  );

  private static webhookReceiver = new WebhookReceiver(
    env.LIVEKIT_API_KEY,
    env.LIVEKIT_API_SECRET
  );

  /**
   * Generates a signed LiveKit WebRTC Access Token with granular permissions
   */
  static async createToken(params: {
    roomName: string;
    participantIdentity: string;
    participantName: string;
    role: MeetingRole;
    permissions: ParticipantPermissions;
    isGhost?: boolean;
    metadata?: Record<string, unknown>;
  }): Promise<string> {
    const at = new AccessToken(env.LIVEKIT_API_KEY, env.LIVEKIT_API_SECRET, {
      identity: params.participantIdentity,
      name: params.participantName,
      metadata: JSON.stringify({
        role: params.role,
        isGhost: Boolean(params.isGhost),
        ...params.metadata,
      }),
      ttl: "6h",
    });

    // Ghost Mode: Observer is invisible, cannot publish tracks or data
    if (params.isGhost || params.role === "ghost") {
      at.addGrant({
        room: params.roomName,
        roomJoin: true,
        canPublish: false,
        canPublishData: false,
        canSubscribe: true,
        hidden: true, // Invisible in LiveKit participant roster!
      });
      return at.toJwt();
    }

    // Role-based grants
    const isHostOrAdmin = params.role === "host" || params.role === "cohost";

    at.addGrant({
      room: params.roomName,
      roomJoin: true,
      canPublish: params.permissions.canPublishAudio || params.permissions.canPublishVideo,
      canPublishData: params.permissions.canChat || params.permissions.canUseWhiteboard,
      canSubscribe: true,
      roomAdmin: isHostOrAdmin,
      roomCreate: isHostOrAdmin,
      roomRecord: isHostOrAdmin,
    });

    return at.toJwt();
  }

  static getRoomServiceClient(): RoomServiceClient {
    return this.roomService;
  }

  static getWebhookReceiver(): WebhookReceiver {
    return this.webhookReceiver;
  }
}
