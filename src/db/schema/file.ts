import {
  pgTable,
  uuid,
  timestamp,
  text,
  foreignKey,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { folders } from "./folder";
import { workspaces } from "./workspace";

export const files = pgTable(
  "files",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    createdAt: timestamp({ withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    title: text().notNull(),
    iconId: text().notNull(),
    data: text(),
    inTrash: text(),
    bannerUrl: text(),
    workspaceId: uuid().notNull(),
    folderId: uuid().notNull(),
  },
  (table) => {
    return {
      filesFolderIdFoldersIdFk: foreignKey({
        columns: [table.folderId],
        foreignColumns: [folders.id],
        name: "files_folder_id_folders_id_fk",
      }).onDelete("cascade"),
      filesWorkspaceIdWorkspacesIdFk: foreignKey({
        columns: [table.workspaceId],
        foreignColumns: [workspaces.id],
        name: "files_workspace_id_workspaces_id_fk",
      }).onDelete("cascade"),
    };
  }
);

export type File = InferSelectModel<typeof files>;
