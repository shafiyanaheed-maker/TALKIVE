import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { getDatabase, users, refreshTokens, eq } from "@talkive/database";
import { env } from "../../config/env.js";
import type { LoginRequest, RegisterRequest, AuthTokens } from "@talkive/types";
import { nanoid } from "nanoid";

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  organizationId?: string | null;
}

export class AuthService {
  private static db = getDatabase(env.DATABASE_URL);

  static async hashPassword(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
    });
  }

  static async verifyPassword(hash: string, plain: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, plain);
    } catch {
      return false;
    }
  }

  static generateTokens(payload: TokenPayload): AuthTokens {
    const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 15 * 60,
    };
  }

  static verifyAccessToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
    } catch {
      return null;
    }
  }

  static async register(data: RegisterRequest) {
    const existing = await this.db.query.users.findFirst({
      where: eq(users.email, data.email.toLowerCase()),
    });

    if (existing) {
      throw new Error("Email is already registered");
    }

    const passwordHash = await this.hashPassword(data.password);
    const [user] = await this.db
      .insert(users)
      .values({
        email: data.email.toLowerCase(),
        passwordHash,
        fullName: data.fullName,
        role: "member",
      })
      .returning();

    if (!user) {
      throw new Error("Failed to create user");
    }

    const tokens = this.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      tokens,
    };
  }

  static async login(data: LoginRequest) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, data.email.toLowerCase()),
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isValid = await this.verifyPassword(user.passwordHash, data.password);
    if (!isValid) {
      throw new Error("Invalid email or password");
    }

    const tokens = this.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      tokens,
    };
  }
}
