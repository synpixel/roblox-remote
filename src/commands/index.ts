import {
  APIApplicationCommandInteractionData,
  APIApplicationCommandOption,
  APIBaseInteraction,
  APIInteractionResponseCallbackData,
  InteractionType,
} from "discord-api-types/v10";

import { link, unlink, view } from "./account.js";

import { add, list, remove } from "./universe.js";

import { kick } from "./kick.js";

export type Command = (
  interaction: APIBaseInteraction<
    InteractionType.ApplicationCommand,
    APIApplicationCommandInteractionData
  >,
  options?: { [key: string]: any }
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
    list,
    remove,
  },
  kick,
};

export function parseOptions(options: APIApplicationCommandOption[]): {
  [key: string]: any;
} {
  const optionsResult: { [key: string]: any } = {};
  for (const option of options) {
    optionsResult[option.name] = option.value;
  }
  return optionsResult;
}
