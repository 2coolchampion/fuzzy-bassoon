ALTER TABLE "files" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "files" RENAME COLUMN "iconId" TO "icon_id";--> statement-breakpoint
ALTER TABLE "files" RENAME COLUMN "inTrash" TO "in_trash";--> statement-breakpoint
ALTER TABLE "files" RENAME COLUMN "bannerUrl" TO "banner_url";--> statement-breakpoint
ALTER TABLE "files" RENAME COLUMN "workspaceId" TO "workspace_id";--> statement-breakpoint
ALTER TABLE "files" RENAME COLUMN "folderId" TO "folder_id";--> statement-breakpoint
ALTER TABLE "folders" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "folders" RENAME COLUMN "iconId" TO "icon_id";--> statement-breakpoint
ALTER TABLE "folders" RENAME COLUMN "inTrash" TO "in_trash";--> statement-breakpoint
ALTER TABLE "folders" RENAME COLUMN "bannerUrl" TO "banner_url";--> statement-breakpoint
ALTER TABLE "folders" RENAME COLUMN "workspaceId" TO "workspace_id";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "avatarUrl" TO "avatar_url";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "lastSignedIn" TO "last_signed_in";--> statement-breakpoint
ALTER TABLE "workspaces" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "workspaces" RENAME COLUMN "workspaceOwner" TO "workspace_owner";--> statement-breakpoint
ALTER TABLE "workspaces" RENAME COLUMN "iconId" TO "icon_id";--> statement-breakpoint
ALTER TABLE "workspaces" RENAME COLUMN "inTrash" TO "in_trash";--> statement-breakpoint
ALTER TABLE "workspaces" RENAME COLUMN "bannerUrl" TO "banner_url";--> statement-breakpoint
ALTER TABLE "files" DROP CONSTRAINT "files_folder_id_folders_id_fk";
--> statement-breakpoint
ALTER TABLE "files" DROP CONSTRAINT "files_workspace_id_workspaces_id_fk";
--> statement-breakpoint
ALTER TABLE "folders" DROP CONSTRAINT "folders_workspace_id_workspaces_id_fk";
--> statement-breakpoint
ALTER TABLE "workspaces" DROP CONSTRAINT "workspaces_workspace_owner_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "files" ADD CONSTRAINT "files_folder_id_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."folders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "files" ADD CONSTRAINT "files_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "folders" ADD CONSTRAINT "folders_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_workspace_owner_users_id_fk" FOREIGN KEY ("workspace_owner") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
