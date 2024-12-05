import {
  pgTable,
  uuid,
  timestamp,
  text,
  foreignKey,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { workspaces } from "./workspace";

export const folders = pgTable(
  "folders",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    title: text().notNull(),
    iconId: text("icon_id").notNull(),
    data: text(),
    inTrash: text("in_trash"),
    bannerUrl: text("banner_url"),
    workspaceId: uuid("workspace_id").notNull(),
  },
  (table) => {
    return {
      foldersWorkspaceIdWorkspacesIdFk: foreignKey({
        columns: [table.workspaceId],
        foreignColumns: [workspaces.id],
        name: "folders_workspace_id_workspaces_id_fk",
      }).onDelete("cascade"),
    };
  }
);

export type Folder = InferSelectModel<typeof folders>;
