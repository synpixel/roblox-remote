import {
  APIApplicationCommandInteractionData,
  APIBaseInteraction,
  InteractionType,
} from "discord-api-types/v10";
import { getUserFromDiscordId, removeUserByDiscordId } from "../db/users.js";
import { generateUserCode } from "../kv/userCodes.js";

export async function link(
  interaction: APIBaseInteraction<
    InteractionType.ApplicationCommand,
    APIApplicationCommandInteractionData
  >
) {
  if (!interaction.member) {
    return { content: "Not a member." };
  }

  const userCode = await generateUserCode(interaction.member.user.id);

  return {
    content: "Log into your Roblox account by pressing the following button:",
    flags: 1 << 6,
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            style: 5,
            label: "Authenticate",
            url: `https://roblox-remote.vercel.app/api/login?userCode=${userCode}`,
          },
        ],
      },
    ],
  };
}

export async function view(
  interaction: APIBaseInteraction<
    InteractionType.ApplicationCommand,
    APIApplicationCommandInteractionData
  >
) {
  if (!interaction.member) {
    return { content: "Not a member." };
  }

  for (const user of await getUserFromDiscordId(
    parseInt(interaction.member.user.id, 10)
  )) {
    return {
      content: `https://www.roblox.com/users/${user.robloxId}/profile`,
    };
  }

  return {
    content: "No roblox account associated with your discord account.",
  };
}

export async function unlink(
  interaction: APIBaseInteraction<
    InteractionType.ApplicationCommand,
    APIApplicationCommandInteractionData
  >
) {
  if (!interaction.member) {
    return { content: "Not a member." };
  }

  return await removeUserByDiscordId(parseInt(interaction.member.user.id, 10))
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
