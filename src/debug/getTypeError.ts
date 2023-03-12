import { InteractionResponseType } from 'discord-api-types/v10';

export default function getTypeError(expected: number, got: number) {
    return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: `Expected ${expected}, got ${got}`
        }
    }
}