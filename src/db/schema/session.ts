import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { AuthJsSchema } from "./schemas";
import { users } from "./user";
import { InferSelectModel } from "drizzle-orm";

export const sessions = AuthJsSchema.table("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export type Session = InferSelectModel<typeof sessions>;
