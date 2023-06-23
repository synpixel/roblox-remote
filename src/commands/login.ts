import { APIBaseInteraction, InteractionType } from "discord-api-types/v10";
import { generateUserCode } from "../kv/userCodes";

export default async function (
  interaction: APIBaseInteraction<InteractionType.ApplicationCommand, undefined>
) {
  if (!interaction.member) {
    return { content: "Not a member." };
  }

  const userCode = await generateUserCode(interaction.member.user.id);

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
            url: `https://roblox-remote.vercel.app/api/login?userCode=${userCode}`,
          },
        ],
      },
    ],
  };
}
