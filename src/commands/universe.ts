import {
  APIApplicationCommandInteractionData,
  APIBaseInteraction,
  InteractionType,
} from "discord-api-types/v10";
import { insertUniverse, removeUniverseByName } from "../db/universes.js";

export async function add(
  interaction: APIBaseInteraction<
    InteractionType.ApplicationCommand,
    APIApplicationCommandInteractionData
  >,
  options?: { [key: string]: any }
) {
  if (!options) {
    return {
      content: "Missing options..?",
    };
  }

  return insertUniverse({
    name: options.name,
    universeId: options.id,
    apiKey: options.api_key,
  })
    .then((universes) => {
      for (const universe of universes) {
        return {
          content: `Successfully added universe ${universe.universeId} under the name "${universe.name}"`,
        };
      }

      return {
        content: "Failed to resolve universe.",
      };
    })
    .catch(() => {
      return {
        content: "Failed to add universe.",
      };
    });
}

export async function remove(
  interaction: APIBaseInteraction<
    InteractionType.ApplicationCommand,
    APIApplicationCommandInteractionData
  >,
  options?: { [key: string]: any }
) {
  if (!options) {
    return {
      content: "Missing options..?",
    };
  }

  return removeUniverseByName(options.name)
    .then(() => {
      return {
        content: `Successfully removed universe ${options.name}`,
      };
    })
    .catch(() => {
      return {
        content: "Failed to remove universe.",
      };
    });
}
