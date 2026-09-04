import { pgTable, uuid, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { meetings } from "./meetings.js";
import { users } from "./users.js";

export const polls = pgTable("polls", {
  id: uuid("id").primaryKey().defaultRandom(),
  meetingId: uuid("meeting_id").notNull().references(() => meetings.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  options: jsonb("options").$type<Array<{ id: string; text: string; voteCount: number }>>().notNull().default([]),
  isAnonymous: boolean("is_anonymous").notNull().default(false),
  isMultipleChoice: boolean("is_multiple_choice").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  createdById: text("created_by_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  closedAt: timestamp("closed_at", { withTimezone: true }),
});

export const pollVotes = pgTable("poll_votes", {
  id: uuid("id").primaryKey().defaultRandom(),
  pollId: uuid("poll_id").notNull().references(() => polls.id, { onDelete: "cascade" }),
  optionId: uuid("option_id").notNull(),
  participantId: text("participant_id").notNull(),
  votedAt: timestamp("voted_at", { withTimezone: true }).notNull().defaultNow(),
});

export const sharedNotes = pgTable("shared_notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  meetingId: uuid("meeting_id").notNull().references(() => meetings.id, { onDelete: "cascade" }),
  content: text("content").notNull().default(""),
  lastEditedById: text("last_edited_by_id"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const whiteboardSnapshots = pgTable("whiteboard_snapshots", {
  id: uuid("id").primaryKey().defaultRandom(),
  meetingId: uuid("meeting_id").notNull().references(() => meetings.id, { onDelete: "cascade" }),
  snapshotUrl: text("snapshot_url").notNull(),
  version: text("version").notNull().default("1.0"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
