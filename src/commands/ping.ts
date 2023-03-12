import { InteractionResponseType } from 'discord-api-types/v10';

export default {
  run: async function() {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: "Hello, world!"
      }
    }
  }
}