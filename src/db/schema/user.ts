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
import type { AdapterAccountType } from "next-auth/adapters";
import { relations } from "drizzle-orm/relations";
import type { InferSelectModel } from "drizzle-orm";

export const users = pgTable(
  "user",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    name: text("name"),
    email: varchar({ length: 256 }).notNull(),
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
  },
  (table) => ({
    usersEmailUnique: unique("users_email_unique").on(table.email),
  })
);

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

// Relations will be defined in a separate file to avoid circular dependencies
export type User = InferSelectModel<typeof users>;
export type Account = InferSelectModel<typeof accounts>;
