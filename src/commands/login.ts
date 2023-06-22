import { APIBaseInteraction, InteractionType } from "discord-api-types/v10";

export default async function (
  interaction: APIBaseInteraction<InteractionType.ApplicationCommand, undefined>
) {
  const authenticationSearchParams = new URLSearchParams();

  if (interaction.user) {
    authenticationSearchParams.append("client_id", interaction.user.id);
    authenticationSearchParams.append("redirect_uri", "https://google.com/");
    authenticationSearchParams.append("scope", "openid profile");
  }

  const authenticationURL = `https://apis.roblox.com/oauth/v1/authorize?${authenticationSearchParams.toString()}`;

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
