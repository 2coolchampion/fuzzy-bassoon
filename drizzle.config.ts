import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/migrations/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
  migrations: {
    table: "migrations",
    schema: "drizzle",
  },
});
