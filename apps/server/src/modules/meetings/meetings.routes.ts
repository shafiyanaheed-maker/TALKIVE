import type { FastifyPluginAsync } from "fastify";
import { MeetingsService } from "./meetings.service.js";
import { AuthService } from "../auth/auth.service.js";
import { CreateMeetingRequestSchema, JoinMeetingRequestSchema } from "@talkive/types";

export const meetingsRoutes: FastifyPluginAsync = async (fastify) => {
  // Create Meeting
  fastify.post("/", async (request, reply) => {
    // Optional auth, otherwise fallback to guest creator
    const authHeader = request.headers.authorization;
    let userId = "00000000-0000-0000-0000-000000000000"; // Default guest creator UUID

    if (authHeader?.startsWith("Bearer ")) {
      const payload = AuthService.verifyAccessToken(authHeader.substring(7));
      if (payload) {
        userId = payload.userId;
      }
    }

    const parseResult = CreateMeetingRequestSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid meeting creation payload",
          details: parseResult.error.flatten().fieldErrors,
        },
      });
    }

    try {
      const meeting = await MeetingsService.createMeeting(userId, parseResult.data);
      return reply.status(201).send({
        success: true,
        data: meeting,
      });
    } catch (err: any) {
      return reply.status(500).send({
        success: false,
        error: { code: "CREATE_MEETING_FAILED", message: err.message },
      });
    }
  });

  // Get Meeting Info
  fastify.get("/:code", async (request, reply) => {
    const { code } = request.params as { code: string };
    const meeting = await MeetingsService.getMeetingByCode(code);

    if (!meeting) {
      return reply.status(404).send({
        success: false,
        error: { code: "MEETING_NOT_FOUND", message: "No meeting found with this code" },
      });
    }

    return reply.send({
      success: true,
      data: meeting,
    });
  });

  // Join Meeting & Issue LiveKit WebRTC Token
  fastify.post("/:code/join", async (request, reply) => {
    const { code } = request.params as { code: string };

    const parseResult = JoinMeetingRequestSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid join payload",
          details: parseResult.error.flatten().fieldErrors,
        },
      });
    }

    let authenticatedUserId: string | undefined;
    const authHeader = request.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      const payload = AuthService.verifyAccessToken(authHeader.substring(7));
      if (payload) {
        authenticatedUserId = payload.userId;
      }
    }

    try {
      const session = await MeetingsService.joinMeeting(
        code,
        parseResult.data,
        authenticatedUserId
      );

      return reply.send({
        success: true,
        data: session,
      });
    } catch (err: any) {
      return reply.status(400).send({
        success: false,
        error: { code: "JOIN_FAILED", message: err.message },
      });
    }
  });
};
