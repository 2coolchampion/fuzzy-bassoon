import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Check if we have the required environment variables
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Create the connection
const client = postgres(process.env.DATABASE_URL);
export const db = drizzle(client, { schema, casing: "snake_case" });
