import {
  APIApplicationCommandInteractionData,
  APIBaseInteraction,
  InteractionType,
} from "discord-api-types/v10";

export async function add(
  interaction: APIBaseInteraction<
    InteractionType.ApplicationCommand,
    APIApplicationCommandInteractionData
  >
) {
  console.log(interaction.data.options);
  return {
    content: "Hello, world!",
  };
}

export async function remove(
  interaction: APIBaseInteraction<
    InteractionType.ApplicationCommand,
    APIApplicationCommandInteractionData
  >
) {
  console.log(interaction.data.options);
  return {
    content: "Hello, world!",
  };
}
