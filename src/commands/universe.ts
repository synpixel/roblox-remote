import {
  APIApplicationCommandInteractionData,
  APIBaseInteraction,
  InteractionType,
} from "discord-api-types/v10";
import {
  insertUniverse,
  listUniverses,
  removeUniverseByName,
} from "../db/universes.js";

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
          content: `Successfully added universe ${universe.universeId} under the name "${universe.name}"!`,
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

export async function list(
  interaction: APIBaseInteraction<
    InteractionType.ApplicationCommand,
    APIApplicationCommandInteractionData
  >,
  options?: { [key: string]: any }
) {
  const universes: string[] = [];
  for (const universe of await listUniverses()) {
    universes.push(`- ${universe.name} (ID: ${universe.universeId})`);
  }
  return {
    content:
      universes.length > 0
        ? universes.join("\n")
        : "You didn't register any universe. Use the `/universe add` command to register one!",
  };
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
        content: `Successfully removed universe ${options.name}!`,
      };
    })
    .catch(() => {
      return {
        content: "Failed to remove universe.",
      };
    });
}
