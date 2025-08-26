import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    host: "ep-patient-thunder-ado44zbt-pooler.c-2.us-east-1.aws.neon.tech",
    user: "neondb_owner",
    password: "npg_KNcHI1Gd6Tkv",
    database: "neondb",
    ssl: true, // important for Neon
  },
});
