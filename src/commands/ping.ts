import { InteractionResponseType } from 'discord-interactions';

export default {
  run: async function() {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "Hello, world!"
      }
    }
  }
}