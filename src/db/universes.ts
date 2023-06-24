import { sql } from "@vercel/postgres";
import { InferModel } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const universes = pgTable("universes", {
  id: serial("id").primaryKey(),
  name: text("name"),
  universeId: integer("universe_id"),
  apiKey: text("api_key"),
});

export type Universe = InferModel<typeof universes>;
export type NewUniverse = InferModel<typeof universes, "insert">;

const database = drizzle(sql);

export async function insertUniverse(
  universe: NewUniverse
): Promise<Universe[]> {
  return await database.insert(universes).values(universe).returning();
}
