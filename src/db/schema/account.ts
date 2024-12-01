import { InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, text, integer, primaryKey } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import { users } from "./user";
import { UserAuthSchema } from "./schemas";
export const accounts = UserAuthSchema.table(
  "account",
  {
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text().$type<AdapterAccountType>().notNull(),
    provider: text().notNull(),
    providerAccountId: text().notNull(),
    refresh_token: text(),
    access_token: text(),
    expires_at: integer(),
    token_type: text(),
    scope: text(),
    id_token: text(),
    session_state: text(),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

// Relations will be defined in a separate file to avoid circular dependencies
export type Account = InferSelectModel<typeof accounts>;
