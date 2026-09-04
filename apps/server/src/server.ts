import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import websocket from "@fastify/websocket";
import { env } from "./config/env.js";
import { healthRoutes } from "./modules/health/health.routes.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { meetingsRoutes } from "./modules/meetings/meetings.routes.js";
import { SignalingGateway } from "./modules/signaling/signaling.gateway.js";

export async function buildServer() {
  const app = Fastify({
    logger: env.NODE_ENV === "development" ? {
      transport: {
        target: "pino-pretty",
        options: { colorize: true, translateTime: "HH:MM:ss" },
      },
    } : true,
  });

  // CORS
  await app.register(cors, {
    origin: [env.WEB_URL, "http://localhost:3000"],
    credentials: true,
  });

  // Cookie
  await app.register(cookie, {
    secret: env.COOKIE_SECRET,
  });

  // WebSocket support
  await app.register(websocket);

  // Initialize Real-Time Signaling Gateway & Redis PubSub
  SignalingGateway.initialize();

  // Signaling WebSocket endpoint
  app.register(async (fastify) => {
    fastify.get("/ws/signaling", { websocket: true }, (socket, req) => {
      SignalingGateway.handleConnection(socket);
    });
  });

  // Register API Routes
  await app.register(healthRoutes);
  await app.register(authRoutes, { prefix: "/api/v1/auth" });
  await app.register(meetingsRoutes, { prefix: "/api/v1/meetings" });

  // Centralized Error Handling
  app.setErrorHandler((error: any, request, reply) => {
    app.log.error(error);
    reply.status(error.statusCode || 500).send({
      success: false,
      error: {
        code: error.code || "INTERNAL_SERVER_ERROR",
        message: error.message || "An unexpected error occurred",
      },
    });
  });

  return app;
}
