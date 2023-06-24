import {
  APIApplicationCommandInteractionData,
  APIBaseInteraction,
  APIInteractionResponseCallbackData,
  InteractionType,
} from "discord-api-types/v10";

import { link } from "./account/link.js";
import { unlink } from "./account/unlink.js";
import { view } from "./account/view.js";

export type Command = (
  interaction: APIBaseInteraction<
    InteractionType.ApplicationCommand,
    APIApplicationCommandInteractionData
  >
) => Promise<APIInteractionResponseCallbackData>;

export const commands: { [key: string]: Command | { [key: string]: Command } } =
  {
    link,
    view,
    unlink,
  };
