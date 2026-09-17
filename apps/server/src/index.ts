import Fastify from "fastify";
import { meetingRoutes } from "./routes/meetings";

const app = Fastify({
  logger: true,
});

/*
 * Basic CORS configuration.
 *
 * Frontend:
 * http://localhost:3000
 *
 * Backend:
 * http://localhost:4000
 */
app.addHook("onRequest", async (request, reply) => {
  reply.header(
    "Access-Control-Allow-Origin",
    "http://localhost:3000"
  );

  reply.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );

  reply.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (request.method === "OPTIONS") {
    reply.status(204).send();
    return;
  }
});

/*
 * Health check
 */
app.get("/health", async () => {
  return {
    status: "healthy",
    service: "talkive-server",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
});

/*
 * Meeting routes
 */
app.register(meetingRoutes);

/*
 * Start server
 */
const port = Number(process.env.PORT) || 4000;
const host = process.env.HOST || "0.0.0.0";

const start = async (): Promise<void> => {
  try {
    await app.listen({
      port,
      host,
    });

    console.log(
      `TALKIVE server running on http://localhost:${port}`
    );
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

void start();