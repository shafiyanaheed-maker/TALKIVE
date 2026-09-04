import { z } from "zod";

export const SupportedCodeLanguageSchema = z.enum([
  "typescript",
  "javascript",
  "python",
  "java",
  "cpp",
  "rust",
  "go",
  "html",
  "css",
  "sql",
  "json",
  "markdown",
]);
export type SupportedCodeLanguage = z.infer<typeof SupportedCodeLanguageSchema>;

export const EditorPaneConfigSchema = z.object({
  id: z.enum(["primary", "secondary"]),
  title: z.string(),
  language: SupportedCodeLanguageSchema,
  isReadOnly: z.boolean().default(false),
  assignedParticipantId: z.string().optional(), // For teacher-student paired coding
  initialContent: z.string().default(""),
});
export type EditorPaneConfig = z.infer<typeof EditorPaneConfigSchema>;

export const DualEditorStateSchema = z.object({
  isEnabled: z.boolean().default(false),
  leftPane: EditorPaneConfigSchema,
  rightPane: EditorPaneConfigSchema,
  syncMode: z.enum(["independent", "synchronized_scroll", "diff_view"]).default("independent"),
});
export type DualEditorState = z.infer<typeof DualEditorStateSchema>;

export const CodeExecutionRequestSchema = z.object({
  paneId: z.enum(["primary", "secondary"]),
  language: SupportedCodeLanguageSchema,
  code: z.string(),
  stdin: z.string().optional(),
});
export type CodeExecutionRequest = z.infer<typeof CodeExecutionRequestSchema>;

export const CodeExecutionResultSchema = z.object({
  paneId: z.enum(["primary", "secondary"]),
  stdout: z.string(),
  stderr: z.string(),
  exitCode: z.number(),
  executionTimeMs: z.number(),
});
export type CodeExecutionResult = z.infer<typeof CodeExecutionResultSchema>;

export const PollOptionSchema = z.object({
  id: z.string().uuid(),
  text: z.string().min(1).max(200),
  voteCount: z.number().default(0),
});
export type PollOption = z.infer<typeof PollOptionSchema>;

export const PollSchema = z.object({
  id: z.string().uuid(),
  meetingId: z.string().uuid(),
  question: z.string().min(1).max(500),
  options: z.array(PollOptionSchema).min(2).max(10),
  isAnonymous: z.boolean().default(false),
  isMultipleChoice: z.boolean().default(false),
  isActive: z.boolean().default(true),
  createdById: z.string(),
  createdAt: z.number(),
  closedAt: z.number().optional().nullable(),
});
export type Poll = z.infer<typeof PollSchema>;

export const SubmitVoteRequestSchema = z.object({
  pollId: z.string().uuid(),
  optionIds: z.array(z.string().uuid()).min(1),
});
export type SubmitVoteRequest = z.infer<typeof SubmitVoteRequestSchema>;
