import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import * as schema from "./migrations/schema";

// Check if we have the required environment variables
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Create the connection
const client = postgres(process.env.DATABASE_URL);
export const db = drizzle(client, { schema });

// Helper function to add a new user
export async function addRow(email: string, fullName?: string) {
  try {
    const result = await db
      .insert(schema.users)
      .values({
        email,
        fullName,
        active: true,
        lastSignedIn: new Date().toISOString(),
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

// Helper function to get a user by email
export async function getUserByEmail(email: string) {
  try {
    const users = await db
      .select()
      .from(schema.users)
      .where(sql`${schema.users.email} = ${email}`);

    return users[0];
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}
