import { relations } from "drizzle-orm/relations";
import { users } from "./user";
import { accounts } from "./account";
import { workspaces } from "./workspace";
import { folders } from "./folder";
import { files } from "./file";

export const usersRelations = relations(users, ({ many }) => ({
  workspaces: many(workspaces),
  accounts: many(accounts),
}));

export const workspacesRelations = relations(workspaces, ({ one, many }) => ({
  files: many(files),
  folders: many(folders),
  user: one(users, {
    fields: [workspaces.workspaceOwner],
    references: [users.id],
  }),
}));

export const foldersRelations = relations(folders, ({ one, many }) => ({
  files: many(files),
  workspace: one(workspaces, {
    fields: [folders.workspaceId],
    references: [workspaces.id],
  }),
}));

export const filesRelations = relations(files, ({ one }) => ({
  folder: one(folders, {
    fields: [files.folderId],
    references: [folders.id],
  }),
  workspace: one(workspaces, {
    fields: [files.workspaceId],
    references: [workspaces.id],
  }),
}));
