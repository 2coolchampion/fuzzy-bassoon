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
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text(),
  email: varchar({ length: 256 }).notNull().unique(),
  emailVerified: timestamp({ mode: "date" }),
  image: text(),
  createdAt: timestamp({ withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  avatarUrl: text(),
  active: boolean().default(true).notNull(),
  lastSignedIn: timestamp({
    withTimezone: true,
    mode: "string",
  }),
});

// Relations will be defined in a separate file to avoid circular dependencies
export type User = InferSelectModel<typeof users>;
