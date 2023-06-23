import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";

const connectionString = "...";
const database = drizzle(sql);

await migrate(database, {
  migrationsFolder: "drizzle",
});
