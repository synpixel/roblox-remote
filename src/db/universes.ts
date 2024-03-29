import { sql } from "@vercel/postgres";
import { InferModel, eq } from "drizzle-orm";
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
  return database.insert(universes).values(universe).returning();
}

export async function removeUniverseByName(name: string) {
  await database.delete(universes).where(eq(universes.name, name));
}

export async function listUniverses(): Promise<Universe[]> {
  return database.select().from(universes);
}
