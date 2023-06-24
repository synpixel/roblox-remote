import { sql } from "@vercel/postgres";
import { InferModel, eq } from "drizzle-orm";
import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  discordId: integer("discord_id"),
  robloxId: integer("roblox_id"),
});

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, "insert">;

const database = drizzle(sql);

export async function insertUser(user: NewUser): Promise<User[]> {
  return await database.insert(users).values(user).returning();
}

export async function getUserFromDiscordId(discordId: number): Promise<User[]> {
  return await database
    .select()
    .from(users)
    .where(eq(users.discordId, discordId));
}
