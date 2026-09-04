import { pgTable, uuid, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { users } from "./users.js";

export const meetings = pgTable("meetings", {
  id: uuid("id").primaryKey().defaultRandom(),
  roomCode: text("room_code").notNull().unique(), // abc-defg-hij format
  title: text("title").notNull(),
  description: text("description"),
  hostId: uuid("host_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  mode: text("mode").notNull().default("general"), // general, education, business, developer, assessment
  accessType: text("access_type").notNull().default("open"), // open, invite_only, domain_restricted, passcode_protected
  settings: jsonb("settings").$type<Record<string, unknown>>().notNull().default({}),
  isLive: boolean("is_live").notNull().default(false),
  startedAt: timestamp("started_at", { withTimezone: true }),
  endedAt: timestamp("ended_at", { withTimezone: true }),
  scheduledStartTime: timestamp("scheduled_start_time", { withTimezone: true }),
  scheduledEndTime: timestamp("scheduled_end_time", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const meetingParticipants = pgTable("meeting_participants", {
  id: uuid("id").primaryKey().defaultRandom(),
  meetingId: uuid("meeting_id").notNull().references(() => meetings.id, { onDelete: "cascade" }),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  displayName: text("display_name").notNull(),
  avatarUrl: text("avatar_url"),
  role: text("role").notNull().default("participant"), // host, cohost, presenter, participant, proctor, ghost
  permissions: jsonb("permissions").$type<Record<string, unknown>>().notNull().default({}),
  isGhost: boolean("is_ghost").notNull().default(false),
  joinedAt: timestamp("joined_at", { withTimezone: true }).notNull().defaultNow(),
  leftAt: timestamp("left_at", { withTimezone: true }),
});
