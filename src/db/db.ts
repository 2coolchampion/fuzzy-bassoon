import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "./schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import path from "path";

dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  console.log("🔴 no database URL");
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(client, { schema });

const migrationsFolder = path.join(process.cwd(), "src", "db", "migrations");

// const migrateDb = async () => {
//   try {
//     console.log("🟠 Migrating client");
//     await migrate(db, { migrationsFolder: migrationsFolder });
//     console.log("🟢 Successfully Migrated");
//   } catch (error) {
//     console.log("🔴 Error Migrating client", error);
//   }
// };
// migrateDb();

export default db;
