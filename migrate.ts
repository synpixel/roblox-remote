import { sql } from "@vercel/postgres";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";

dotenv.config({ path: ".env.development.local" });

const database = drizzle(sql);

(async function () {
  await migrate(database, {
    migrationsFolder: "drizzle",
  });
})();
