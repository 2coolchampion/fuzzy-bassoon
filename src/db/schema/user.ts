import {
  pgTable,
  uuid,
  timestamp,
  text,
  unique,
  varchar,
  boolean,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: varchar({ length: 256 }).notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  avatarUrl: text("avatar_url"),
  active: boolean().default(true).notNull(),
  lastSignedIn: timestamp("last_signed_in", {
    withTimezone: true,
    mode: "string",
  }),
});

// Relations will be defined in a separate file to avoid circular dependencies
export type User = InferSelectModel<typeof users>;
