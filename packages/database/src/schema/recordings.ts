import { pgTable, uuid, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { meetings } from "./meetings.js";

export const recordings = pgTable("recordings", {
  id: uuid("id").primaryKey().defaultRandom(),
  meetingId: uuid("meeting_id").notNull().references(() => meetings.id, { onDelete: "cascade" }),
  egressId: text("egress_id"), // LiveKit Egress ID
  s3Key: text("s3_key").notNull(),
  url: text("url").notNull(),
  durationSeconds: integer("duration_seconds").default(0),
  fileSize: integer("file_size").default(0),
  status: text("status").notNull().default("processing"), // processing, ready, failed
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const meetingSummaries = pgTable("meeting_summaries", {
  id: uuid("id").primaryKey().defaultRandom(),
  meetingId: uuid("meeting_id").notNull().references(() => meetings.id, { onDelete: "cascade" }),
  executiveSummary: text("executive_summary").notNull(),
  keyTopics: jsonb("key_topics").$type<Array<{ topic: string; description: string }>>().default([]),
  decisions: jsonb("decisions").$type<string[]>().default([]),
  actionItems: jsonb("action_items").$type<Array<{ id: string; task: string; assigneeName?: string; dueDate?: string }>>().default([]),
  mermaidDiagram: text("mermaid_diagram"),
  sentiment: text("sentiment").default("neutral"),
  talkTimeDistribution: jsonb("talk_time_distribution").$type<Record<string, number>>().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
