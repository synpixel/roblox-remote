import { kv } from "@vercel/kv";
import { nanoid } from "nanoid";

export async function generateUserCode(userId: string): Promise<string> {
  const userCode = nanoid();
  await kv.set(userCode, parseInt(userId, 10), { ex: 15 * 60 * 1000 });
  return userCode;
}

export async function clearUserCode(userCode: string) {
  await kv.del(userCode);
}

export async function getUserId(userCode: string): Promise<number> {
  return (await kv.get(userCode)) as number;
}
