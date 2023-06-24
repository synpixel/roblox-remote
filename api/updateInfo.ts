import type { VercelRequest, VercelResponse } from "@vercel/node";
import { insertUser } from "../src/db/users.js";
import { clearUserCode, getUserId } from "../src/kv/userCodes.js";

interface Profile {
  sub: string;
  name: string;
  nickname: string;
  preferred_username: string;
  created_at: number;
  profile: string;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const userId = await getUserId(request.query.state as string);
  await clearUserCode(request.query.state as string);

  fetch("https://apis.roblox.com/oauth/v1/userinfo", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${request.query.code}`,
    },
  })
    .then(async (data) => {
      console.log(data);

      const profile: Profile = await data.json();

      console.log(profile);

      insertUser({ discordId: userId, robloxId: parseInt(profile.sub, 10) });

      response.redirect("https://roblox.com/");
    })
    .catch((err) => {
      response.send(`Internal server error\n${err}`);
    });
}
