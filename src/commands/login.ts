import { APIBaseInteraction, InteractionType } from "discord-api-types/v10";

const authenticationSearchParams = new URLSearchParams();

authenticationSearchParams.append("client_id", process.env.CLIENT_ID as string);
authenticationSearchParams.append(
  "redirect_uri",
  "https://roblox-remote.vercel.app/api/updateInfo"
);
authenticationSearchParams.append("scope", "openid profile");
authenticationSearchParams.append("response_type", "code");

const authenticationURL = `https://apis.roblox.com/oauth/v1/authorize?${authenticationSearchParams.toString()}`;

export default async function (
  interaction: APIBaseInteraction<InteractionType.ApplicationCommand, undefined>
) {
  return {
    content: "Log into your Roblox account by pressing the following button:",
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            style: 5,
            label: "Authenticate",
            url: authenticationURL,
          },
        ],
      },
    ],
  };
}
