import {
  APIApplicationCommandInteractionData,
  APIApplicationCommandOption,
  APIBaseInteraction,
  APIInteractionResponseCallbackData,
  InteractionType,
} from "discord-api-types/v10";

import { link, unlink, view } from "./account.js";

import { add, remove } from "./universe.js";

import { kick } from "./kick.js";

export type Command = (
  interaction: APIBaseInteraction<
    InteractionType.ApplicationCommand,
    APIApplicationCommandInteractionData
  >,
  options?: { [key: string]: APIApplicationCommandOption }
) => Promise<APIInteractionResponseCallbackData>;

export const commands: {
  [key: string]: Command | { [key: string]: Command };
} = {
  account: {
    link,
    view,
    unlink,
  },
  universe: {
    add,
    remove,
  },
  kick,
};

export function parseOptions(options: APIApplicationCommandOption[]): {
  [key: string]: APIApplicationCommandOption;
} {
  const optionsResult: { [key: string]: APIApplicationCommandOption } = {};
  for (const option of options) {
    optionsResult[option.name] = option;
  }
  return optionsResult;
}
