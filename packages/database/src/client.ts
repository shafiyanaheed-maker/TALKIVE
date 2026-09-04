import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema/index.js";

const { Pool } = pg;

export type DatabaseInstance = ReturnType<typeof createDatabaseClient>;

let dbInstance: ReturnType<typeof createDatabaseClient> | null = null;

export function createDatabaseClient(connectionString?: string) {
  const connection = connectionString || process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/talkive";
  
  const pool = new Pool({
    connectionString: connection,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  return drizzle(pool, { schema });
}

export function getDatabase(connectionString?: string) {
  if (!dbInstance) {
    dbInstance = createDatabaseClient(connectionString);
  }
  return dbInstance;
}
