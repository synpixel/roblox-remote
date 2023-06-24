import {
  APIApplicationCommandInteractionData,
  APIApplicationCommandOption,
  APIBaseInteraction,
  InteractionType,
} from "discord-api-types/v10";

export async function add(
  interaction: APIBaseInteraction<
    InteractionType.ApplicationCommand,
    APIApplicationCommandInteractionData
  >,
  options?: { [key: string]: APIApplicationCommandOption }
) {
  console.log(options);
  return {
    content: "Hello, world!",
  };
}

export async function remove(
  interaction: APIBaseInteraction<
    InteractionType.ApplicationCommand,
    APIApplicationCommandInteractionData
  >,
  options?: { [key: string]: APIApplicationCommandOption }
) {
  console.log(options);
  return {
    content: "Hello, world!",
  };
}
