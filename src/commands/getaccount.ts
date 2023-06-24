import { APIBaseInteraction, InteractionType } from "discord-api-types/v10";
import { getUserFromDiscordId } from "../db/users.js";

export default async function (
  interaction: APIBaseInteraction<InteractionType.ApplicationCommand, undefined>
) {
  if (!interaction.member) {
    return { content: "Not a member." };
  }

  for (const user of await getUserFromDiscordId(
    parseInt(interaction.member.user.id, 10)
  )) {
    return {
      content: user.robloxId,
    };
  }

  return {
    content: "No roblox account associated with your discord account.",
  };
}
