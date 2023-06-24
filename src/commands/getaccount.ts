import {
  APIApplicationCommandInteractionData,
  APIBaseInteraction,
  InteractionType,
} from "discord-api-types/v10";
import { getUserFromDiscordId } from "../db/users.js";

export async function getaccount(
  interaction: APIBaseInteraction<
    InteractionType.ApplicationCommand,
    APIApplicationCommandInteractionData
  >
) {
  if (!interaction.member) {
    return { content: "Not a member." };
  }

  for (const user of await getUserFromDiscordId(
    parseInt(interaction.member.user.id, 10)
  )) {
    return {
      content: `https://www.roblox.com/users/${user.robloxId}/profile`,
    };
  }

  return {
    content: "No roblox account associated with your discord account.",
  };
}
