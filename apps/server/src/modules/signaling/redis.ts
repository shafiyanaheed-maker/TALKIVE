import { Redis } from "ioredis";
import { env } from "../../config/env.js";

class RedisService {
  private static client: Redis | null = null;
  private static subClient: Redis | null = null;

  static getClient(): Redis {
    if (!this.client) {
      this.client = new Redis(env.REDIS_URL, {
        maxRetriesPerRequest: 3,
        enableReadyCheck: true,
        lazyConnect: true,
      });
      this.client.on("error", (err) => {
        console.warn("⚠️ Redis client connection issue (will retry):", err.message);
      });
    }
    return this.client;
  }

  static getSubscriber(): Redis {
    if (!this.subClient) {
      this.subClient = new Redis(env.REDIS_URL, {
        maxRetriesPerRequest: 3,
        lazyConnect: true,
      });
      this.subClient.on("error", (err) => {
        console.warn("⚠️ Redis subscriber connection issue (will retry):", err.message);
      });
    }
    return this.subClient;
  }
}

export const redis = RedisService.getClient();
export const redisSub = RedisService.getSubscriber();
