import {
  APIApplicationCommandInteractionData,
  APIBaseInteraction,
  APIInteractionResponseCallbackData,
  InteractionType,
} from "discord-api-types/v10";

import { getaccount } from "./getaccount.js";
import { login } from "./login.js";
import { logout } from "./logout.js";

export type Command = (
  interaction: APIBaseInteraction<
    InteractionType.ApplicationCommand,
    APIApplicationCommandInteractionData
  >
) => Promise<APIInteractionResponseCallbackData>;

export const commands: { [key: string]: Command } = {
  login,
  logout,
  getaccount,
};
