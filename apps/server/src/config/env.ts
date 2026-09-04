import { z } from "zod";
import * as dotenv from "dotenv";
import { resolve } from "node:path";

dotenv.config({ path: resolve(process.cwd(), "../../.env") });
dotenv.config();

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  HOST: z.string().default("0.0.0.0"),
  WEB_URL: z.string().default("http://localhost:3000"),
  API_URL: z.string().default("http://localhost:4000"),

  // Database
  DATABASE_URL: z.string().default("postgres://postgres:postgrespassword@localhost:5432/talkive"),

  // Redis
  REDIS_URL: z.string().default("redis://localhost:6379"),

  // Auth
  JWT_ACCESS_SECRET: z.string().min(16).default("dev_jwt_access_secret_super_secure_32chars_min"),
  JWT_REFRESH_SECRET: z.string().min(16).default("dev_jwt_refresh_secret_super_secure_32chars_min"),
  COOKIE_SECRET: z.string().min(16).default("dev_cookie_signing_secret_super_secure_32chars"),

  // LiveKit
  LIVEKIT_URL: z.string().default("ws://localhost:7880"),
  LIVEKIT_API_KEY: z.string().default("devkey"),
  LIVEKIT_API_SECRET: z.string().default("secretdevkey123456789talkive"),
});

export type Env = z.infer<typeof EnvSchema>;

export function loadEnv(): Env {
  const result = EnvSchema.safeParse(process.env);
  if (!result.success) {
    console.error("❌ Invalid environment variables:", result.error.flatten().fieldErrors);
    throw new Error("Invalid configuration");
  }
  return result.data;
}

export const env = loadEnv();
