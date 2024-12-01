import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "next-auth/providers/google";
import { users } from "@/db/schema/user";
import { accounts } from "@/db/schema/account";
import { db } from "@/db/index";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, { usersTable: users, accountsTable: accounts }),
  providers: [Google],
});
