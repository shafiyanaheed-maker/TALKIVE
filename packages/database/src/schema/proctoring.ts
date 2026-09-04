import { pgTable, uuid, text, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { meetings } from "./meetings.js";

export const proctoringSessions = pgTable("proctoring_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  meetingId: uuid("meeting_id").notNull().references(() => meetings.id, { onDelete: "cascade" }),
  participantId: text("participant_id").notNull(),
  participantName: text("participant_name").notNull(),
  integrityScore: integer("integrity_score").notNull().default(100),
  totalViolations: integer("total_violations").notNull().default(0),
  isFlagged: boolean("is_flagged").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const proctoringEvents = pgTable("proctoring_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id").notNull().references(() => proctoringSessions.id, { onDelete: "cascade" }),
  meetingId: uuid("meeting_id").notNull().references(() => meetings.id, { onDelete: "cascade" }),
  participantId: text("participant_id").notNull(),
  anomalyType: text("anomaly_type").notNull(), // tab_switch, window_blur, fullscreen_exit, etc.
  severity: text("severity").notNull().default("medium"), // low, medium, high, critical
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  evidenceSnapshotUrl: text("evidence_snapshot_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
