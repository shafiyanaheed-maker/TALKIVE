import { z } from "zod";

export const CaptionChunkSchema = z.object({
  id: z.string().uuid(),
  meetingId: z.string().uuid(),
  speakerId: z.string(),
  speakerName: z.string(),
  text: z.string(),
  isFinal: z.boolean(),
  confidence: z.number().min(0).max(1),
  language: z.string().default("en"),
  timestamp: z.number(),
});
export type CaptionChunk = z.infer<typeof CaptionChunkSchema>;

export const TranslationChunkSchema = z.object({
  id: z.string().uuid(),
  captionId: z.string().uuid(),
  speakerName: z.string(),
  sourceLanguage: z.string(),
  targetLanguage: z.string(),
  originalText: z.string(),
  translatedText: z.string(),
  timestamp: z.number(),
});
export type TranslationChunk = z.infer<typeof TranslationChunkSchema>;

export const ActionItemSchema = z.object({
  id: z.string().uuid(),
  task: z.string().min(1),
  assigneeName: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});
export type ActionItem = z.infer<typeof ActionItemSchema>;

export const MeetingSummarySchema = z.object({
  meetingId: z.string().uuid(),
  title: z.string(),
  executiveSummary: z.string(),
  keyTopics: z.array(
    z.object({
      topic: z.string(),
      description: z.string(),
      timestampMinutes: z.number().optional(),
    })
  ),
  decisions: z.array(z.string()),
  actionItems: z.array(ActionItemSchema),
  mermaidDiagram: z.string().optional(), // Flowchart or mindmap code
  sentiment: z.enum(["positive", "neutral", "constructive", "mixed"]).default("neutral"),
  talkTimeDistribution: z.record(z.string(), z.number()), // participantName -> percentage
  generatedAt: z.string().datetime(),
});
export type MeetingSummary = z.infer<typeof MeetingSummarySchema>;

export const VisualNoteSchema = z.object({
  id: z.string().uuid(),
  meetingId: z.string().uuid(),
  title: z.string(),
  diagramType: z.enum(["flowchart", "mindmap", "architecture", "sequence", "concept_map"]),
  mermaidDefinition: z.string(),
  summaryMarkdown: z.string(),
  createdAt: z.string().datetime(),
});
export type VisualNote = z.infer<typeof VisualNoteSchema>;
