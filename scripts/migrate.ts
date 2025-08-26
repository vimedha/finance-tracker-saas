import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import * as schema from "../db/schema";

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("✅ Migration completed!");
  } catch (error) {
    console.error("❌ Error during migration:", error);
    process.exit(1);
  }
};

main();
