import {
  pgTable,
  uuid,
  timestamp,
  text,
  foreignKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { users } from "./user";
import type { InferSelectModel } from "drizzle-orm";

export const workspaces = pgTable(
  "workspaces",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    workspaceOwner: uuid("workspace_owner").notNull(),
    title: text().notNull(),
    iconId: text("icon_id").notNull(),
    data: text(),
    inTrash: text("in_trash"),
    logo: text(),
    bannerUrl: text("banner_url"),
  },
  (table) => {
    return {
      workspacesWorkspaceOwnerUsersIdFk: foreignKey({
        columns: [table.workspaceOwner],
        foreignColumns: [users.id],
        name: "workspaces_workspace_owner_users_id_fk",
      }).onDelete("cascade"),
    };
  }
);

// Relations will be defined in a separate relations file
export type Workspace = InferSelectModel<typeof workspaces>;
