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

  const tokenSearchParams = new URLSearchParams();

  tokenSearchParams.append("code", request.query.code as string);
  tokenSearchParams.append("grant_type", "authorization_code");
  tokenSearchParams.append("client_id", process.env.CLIENT_ID as string);
  tokenSearchParams.append("client_secret", process.env.SECRET as string);

  fetch("https://apis.roblox.com/oauth/v1/token", {
    method: "POST",
    body: tokenSearchParams,
    headers: {
      ["Content-Type"]: "application/x-www-form-urlencoded",
    },
  })
    .then(async (token) => {
      console.log(token);
      console.log(await token.text());

      fetch("https://apis.roblox.com/oauth/v1/userinfo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await token.text()}`,
        },
      })
        .then(async (data) => {
          console.log(data);

          const profile: Profile = await data.json();

          console.log(profile);

          insertUser({
            discordId: userId,
            robloxId: parseInt(profile.sub, 10),
          });

          response.redirect("https://roblox.com/");
        })
        .catch((err) => {
          response.send(`Internal server error\n${err}`);
        });
    })
    .catch(() => {
      response.send("Internal server error");
    });
}
