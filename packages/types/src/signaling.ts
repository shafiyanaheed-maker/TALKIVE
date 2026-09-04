import { z } from "zod";
import { MeetingParticipantSchema, RoomLayoutSchema, MeetingModeSchema } from "./meeting.js";

export const SocketTopicSchema = z.enum([
  // Connection / Room lifecycle
  "room:join",
  "room:joined",
  "room:participant_joined",
  "room:participant_left",
  "room:updated",
  "room:layout_changed",
  "room:mode_changed",
  "room:locked",
  "room:ended",

  // Media & Interaction controls
  "media:state_changed",
  "media:hand_raise",
  "media:hand_lower",
  "media:mute_all",
  "media:force_mute",
  "media:spotlight",

  // Chat
  "chat:send",
  "chat:broadcast",
  "chat:reaction",
  "chat:typing",

  // Polls
  "poll:create",
  "poll:vote",
  "poll:broadcast",
  "poll:close",

  // Collaboration
  "collab:cursor_move",
  "collab:cursor_broadcast",
  "collab:dual_editor_action",

  // Proctoring
  "proctor:event",
  "proctor:warning_to_user",
  "proctor:terminate_session",

  // AI Live Feeds
  "ai:caption_chunk",
  "ai:translation_chunk",
  "ai:summary_ready",

  // Heartbeat
  "ping",
  "pong",
]);
export type SocketTopic = z.infer<typeof SocketTopicSchema>;

export const SocketEnvelopeSchema = z.object({
  id: z.string().uuid(),
  topic: SocketTopicSchema,
  roomId: z.string(),
  senderId: z.string(),
  timestamp: z.number(),
  payload: z.unknown(),
});
export type SocketEnvelope<T = unknown> = Omit<z.infer<typeof SocketEnvelopeSchema>, "payload"> & {
  payload: T;
};

// Chat payload schemas
export const ChatMessagePayloadSchema = z.object({
  id: z.string().uuid(),
  senderId: z.string(),
  senderName: z.string(),
  senderAvatar: z.string().optional().nullable(),
  text: z.string().min(1).max(2000),
  timestamp: z.number(),
  targetParticipantId: z.string().optional(), // If private message
  replyToMessageId: z.string().uuid().optional(),
});
export type ChatMessagePayload = z.infer<typeof ChatMessagePayloadSchema>;

export const ChatReactionPayloadSchema = z.object({
  messageId: z.string().uuid(),
  emoji: z.string().min(1).max(10),
  participantId: z.string(),
});
export type ChatReactionPayload = z.infer<typeof ChatReactionPayloadSchema>;

// Media change payload
export const MediaStateChangePayloadSchema = z.object({
  participantId: z.string(),
  isAudioMuted: z.boolean().optional(),
  isVideoMuted: z.boolean().optional(),
  isScreenSharing: z.boolean().optional(),
});
export type MediaStateChangePayload = z.infer<typeof MediaStateChangePayloadSchema>;

// Layout change payload
export const LayoutChangePayloadSchema = z.object({
  layout: RoomLayoutSchema,
  spotlightParticipantId: z.string().optional(),
});
export type LayoutChangePayload = z.infer<typeof LayoutChangePayloadSchema>;

// Hand raise payload
export const HandRaisePayloadSchema = z.object({
  participantId: z.string(),
  isRaised: z.boolean(),
  timestamp: z.number(),
});
export type HandRaisePayload = z.infer<typeof HandRaisePayloadSchema>;

// Live cursor payload
export const CursorMovePayloadSchema = z.object({
  participantId: z.string(),
  participantName: z.string(),
  color: z.string(),
  x: z.number(),
  y: z.number(),
  context: z.enum(["whiteboard", "code_left", "code_right", "general"]),
});
export type CursorMovePayload = z.infer<typeof CursorMovePayloadSchema>;
