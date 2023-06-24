import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";

const database = drizzle(sql);

(async function () {
  await migrate(database, {
    migrationsFolder: "drizzle",
  });
})();
