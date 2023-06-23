import type { VercelRequest, VercelResponse } from "@vercel/node";

interface Query {
  userCode: string;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const query = request.query as unknown as Query;

  if (query.userCode) {
    const authenticationSearchParams = new URLSearchParams();

    authenticationSearchParams.append(
      "client_id",
      process.env.CLIENT_ID as string
    );
    authenticationSearchParams.append(
      "redirect_uri",
      "https://roblox-remote.vercel.app/api/updateInfo"
    );
    authenticationSearchParams.append("scope", "openid profile");
    authenticationSearchParams.append("response_type", "code");
    authenticationSearchParams.append("state", query.userCode);

    const authenticationURL = `https://apis.roblox.com/oauth/v1/authorize?${authenticationSearchParams.toString()}`;

    response.redirect(authenticationURL);
  }
}
