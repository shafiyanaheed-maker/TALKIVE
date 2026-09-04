import { z } from "zod";

export const ProctoringAnomalyTypeSchema = z.enum([
  "tab_switch",
  "window_blur",
  "fullscreen_exit",
  "multiple_displays_detected",
  "clipboard_paste_attempt",
  "dev_tools_opened",
  "audio_noise_spike",
  "face_occlusion",
  "multiple_faces",
]);
export type ProctoringAnomalyType = z.infer<typeof ProctoringAnomalyTypeSchema>;

export const ProctoringSeveritySchema = z.enum(["low", "medium", "high", "critical"]);
export type ProctoringSeverity = z.infer<typeof ProctoringSeveritySchema>;

export const ProctoringEventSchema = z.object({
  id: z.string().uuid(),
  meetingId: z.string().uuid(),
  participantId: z.string(),
  participantName: z.string(),
  type: ProctoringAnomalyTypeSchema,
  severity: ProctoringSeveritySchema,
  timestamp: z.number(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  evidenceSnapshotUrl: z.string().url().optional(),
});
export type ProctoringEvent = z.infer<typeof ProctoringEventSchema>;

export const ProctoringSummarySchema = z.object({
  participantId: z.string(),
  participantName: z.string(),
  integrityScore: z.number().min(0).max(100),
  totalViolations: z.number().min(0),
  events: z.array(ProctoringEventSchema),
  isFlaggedForReview: z.boolean(),
});
export type ProctoringSummary = z.infer<typeof ProctoringSummarySchema>;
