import { APIApplicationCommandInteractionDataOption } from 'discord-api-types/v10';

export default function optionsArrayToObject(options: APIApplicationCommandInteractionDataOption[]) {
    const object: {[name: string]: APIApplicationCommandInteractionDataOption} = {};
    for (const option of options) {
        object[option.name] = option;
    }
    return object
}