import type { FastifyPluginAsync } from "fastify";
import { AuthService } from "./auth.service.js";
import { RegisterRequestSchema, LoginRequestSchema } from "@talkive/types";

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post("/register", async (request, reply) => {
    const parseResult = RegisterRequestSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid registration payload",
          details: parseResult.error.flatten().fieldErrors,
        },
      });
    }

    try {
      const result = await AuthService.register(parseResult.data);
      return reply.status(201).send({
        success: true,
        data: result,
      });
    } catch (err: any) {
      return reply.status(400).send({
        success: false,
        error: { code: "REGISTRATION_FAILED", message: err.message },
      });
    }
  });

  fastify.post("/login", async (request, reply) => {
    const parseResult = LoginRequestSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid login payload",
          details: parseResult.error.flatten().fieldErrors,
        },
      });
    }

    try {
      const result = await AuthService.login(parseResult.data);
      return reply.send({
        success: true,
        data: result,
      });
    } catch (err: any) {
      return reply.status(401).send({
        success: false,
        error: { code: "AUTHENTICATION_FAILED", message: err.message },
      });
    }
  });

  fastify.get("/me", async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return reply.status(401).send({
        success: false,
        error: { code: "UNAUTHORIZED", message: "Missing authorization token" },
      });
    }

    const token = authHeader.substring(7);
    const payload = AuthService.verifyAccessToken(token);
    if (!payload) {
      return reply.status(401).send({
        success: false,
        error: { code: "INVALID_TOKEN", message: "Token is invalid or expired" },
      });
    }

    return reply.send({
      success: true,
      data: { user: payload },
    });
  });
};
