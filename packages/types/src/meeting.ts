import { z } from "zod";
import { MeetingRoleSchema } from "./auth.js";

export const MeetingModeSchema = z.enum([
  "general",
  "education",
  "business",
  "developer",
  "assessment",
]);
export type MeetingMode = z.infer<typeof MeetingModeSchema>;

export const MeetingAccessTypeSchema = z.enum([
  "open",
  "invite_only",
  "domain_restricted",
  "passcode_protected",
]);
export type MeetingAccessType = z.infer<typeof MeetingAccessTypeSchema>;

export const RoomLayoutSchema = z.enum([
  "grid",
  "spotlight",
  "sidebar",
  "presentation",
  "dual_editor",
  "whiteboard",
]);
export type RoomLayout = z.infer<typeof RoomLayoutSchema>;

export const ParticipantPermissionsSchema = z.object({
  canPublishAudio: z.boolean().default(true),
  canPublishVideo: z.boolean().default(true),
  canScreenShare: z.boolean().default(true),
  canChat: z.boolean().default(true),
  canUseWhiteboard: z.boolean().default(true),
  canEditCode: z.boolean().default(true),
  canStartPoll: z.boolean().default(false),
  canMuteOthers: z.boolean().default(false),
  canKickOthers: z.boolean().default(false),
  isGhost: z.boolean().default(false),
});
export type ParticipantPermissions = z.infer<typeof ParticipantPermissionsSchema>;

export const MeetingParticipantSchema = z.object({
  id: z.string(),
  userId: z.string().uuid().optional(),
  name: z.string().min(1).max(100),
  avatarUrl: z.string().url().optional().nullable(),
  role: MeetingRoleSchema,
  permissions: ParticipantPermissionsSchema,
  isAudioMuted: z.boolean().default(false),
  isVideoMuted: z.boolean().default(false),
  isScreenSharing: z.boolean().default(false),
  isHandRaised: z.boolean().default(false),
  handRaisedAt: z.number().optional().nullable(),
  joinedAt: z.string().datetime(),
});
export type MeetingParticipant = z.infer<typeof MeetingParticipantSchema>;

export const MeetingSettingsSchema = z.object({
  allowGuestAccess: z.boolean().default(true),
  muteParticipantsOnEntry: z.boolean().default(false),
  requireHostApproval: z.boolean().default(false), // Waiting room
  enableE2EE: z.boolean().default(false),
  enableRecording: z.boolean().default(true),
  enableAICaptions: z.boolean().default(true),
  enableAITranslation: z.boolean().default(true),
  enableAISummary: z.boolean().default(true),
  enableProctoring: z.boolean().default(false),
  allowedEmailDomains: z.array(z.string()).default([]),
  passcode: z.string().min(4).max(20).optional(),
});
export type MeetingSettings = z.infer<typeof MeetingSettingsSchema>;

export const MeetingDetailsSchema = z.object({
  id: z.string().uuid(),
  roomCode: z.string().regex(/^[a-z]{3}-[a-z]{4}-[a-z]{3}$/), // e.g. abc-defg-hij
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional().nullable(),
  hostId: z.string().uuid(),
  mode: MeetingModeSchema.default("general"),
  accessType: MeetingAccessTypeSchema.default("open"),
  settings: MeetingSettingsSchema,
  isLive: z.boolean().default(false),
  startedAt: z.string().datetime().optional().nullable(),
  endedAt: z.string().datetime().optional().nullable(),
  scheduledStartTime: z.string().datetime().optional().nullable(),
  scheduledEndTime: z.string().datetime().optional().nullable(),
  createdAt: z.string().datetime(),
});
export type MeetingDetails = z.infer<typeof MeetingDetailsSchema>;

export const CreateMeetingRequestSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  mode: MeetingModeSchema.default("general"),
  accessType: MeetingAccessTypeSchema.default("open"),
  settings: MeetingSettingsSchema.partial().optional(),
  scheduledStartTime: z.string().datetime().optional(),
  scheduledEndTime: z.string().datetime().optional(),
});
export type CreateMeetingRequest = z.infer<typeof CreateMeetingRequestSchema>;

export const JoinMeetingRequestSchema = z.object({
  roomCode: z.string(),
  displayName: z.string().min(1).max(100),
  passcode: z.string().optional(),
  isGhostRequested: z.boolean().optional().default(false),
});
export type JoinMeetingRequest = z.infer<typeof JoinMeetingRequestSchema>;

export const JoinMeetingResponseSchema = z.object({
  meeting: MeetingDetailsSchema,
  participant: MeetingParticipantSchema,
  livekitToken: z.string(),
  livekitUrl: z.string().url(),
  signalingUrl: z.string().url(),
});
export type JoinMeetingResponse = z.infer<typeof JoinMeetingResponseSchema>;
