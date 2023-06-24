import {
  APIApplicationCommandInteractionData,
  APIBaseInteraction,
  InteractionType,
} from "discord-api-types/v10";

export async function kick(
  interaction: APIBaseInteraction<
    InteractionType.ApplicationCommand,
    APIApplicationCommandInteractionData
  >
) {
  return {};
}
