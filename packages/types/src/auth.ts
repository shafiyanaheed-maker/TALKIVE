import { z } from "zod";

export const UserRoleSchema = z.enum([
  "super_admin",
  "org_admin",
  "instructor",
  "member",
  "guest",
]);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const MeetingRoleSchema = z.enum([
  "host",
  "cohost",
  "presenter",
  "participant",
  "proctor",
  "ghost",
]);
export type MeetingRole = z.infer<typeof MeetingRoleSchema>;

export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  fullName: z.string().min(1).max(100),
  avatarUrl: z.string().url().optional().nullable(),
  role: UserRoleSchema.default("member"),
  organizationId: z.string().uuid().optional().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type UserProfile = z.infer<typeof UserProfileSchema>;

export const AuthTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
});
export type AuthTokens = z.infer<typeof AuthTokensSchema>;

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const RegisterRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/, "Must contain uppercase").regex(/[0-9]/, "Must contain number"),
  fullName: z.string().min(2).max(100),
  organizationName: z.string().min(2).max(100).optional(),
});
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
