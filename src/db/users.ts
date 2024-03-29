import { sql } from "@vercel/postgres";
import { InferModel, eq } from "drizzle-orm";
import { bigint, integer, pgTable, serial } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  discordId: bigint("discord_id", { mode: "bigint" }),
  robloxId: integer("roblox_id"),
});

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, "insert">;

const database = drizzle(sql);

export async function insertUser(user: NewUser): Promise<User[]> {
  return database.insert(users).values(user).returning();
}

export async function removeUserByDiscordId(discordId: number) {
  await database.delete(users).where(eq(users.discordId, BigInt(discordId)));
}

export async function getUserFromDiscordId(discordId: number): Promise<User[]> {
  return database
    .select()
    .from(users)
    .where(eq(users.discordId, BigInt(discordId)));
}
