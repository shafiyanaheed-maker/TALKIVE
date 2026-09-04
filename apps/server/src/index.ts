import { buildServer } from "./server.js";
import { env } from "./config/env.js";

async function main() {
  const server = await buildServer();

  try {
    const address = await server.listen({
      port: env.PORT,
      host: env.HOST,
    });
    console.log(`🚀 Talkive Server running on ${address}`);
    console.log(`📡 WebSocket Signaling available at ws://${env.HOST}:${env.PORT}/ws/signaling`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }

  const signals = ["SIGINT", "SIGTERM"];
  for (const signal of signals) {
    process.on(signal, async () => {
      console.log(`\nReceived ${signal}, gracefully shutting down Talkive server...`);
      await server.close();
      process.exit(0);
    });
  }
}

main();
