import {
  APIApplicationCommandInteractionData,
  APIBaseInteraction,
  InteractionType,
} from "discord-api-types/v10";
import { removeUserFromDiscordId } from "../db/users.js";

export async function logout(
  interaction: APIBaseInteraction<
    InteractionType.ApplicationCommand,
    APIApplicationCommandInteractionData
  >
) {
  if (!interaction.member) {
    return { content: "Not a member." };
  }

  return await removeUserFromDiscordId(parseInt(interaction.member.user.id, 10))
    .then(() => {
      return {
        content: "Successfully logged out of your roblox account!",
      };
    })
    .catch(() => {
      return {
        content: "Failed to log out of your roblox account.",
      };
    });
}
