import type { VercelRequest, VercelResponse } from '@vercel/node';
import { InteractionResponseType, InteractionType } from 'discord-api-types/v10';
import { verifyKey } from 'discord-interactions';
import type { Readable } from 'node:stream';
import getCommands from '../src/getCommands';
import optionsArrayToObject from '../src/optionsArrayToObject';
import prismaClient from '../src/prismaClient';

export const config = {
    api: {
      bodyParser: false,
    },
};

async function buffer(readable: Readable) {
    const chunks = [];
    for await (const chunk of readable) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

export default async function interactions(
  request: VercelRequest,
  response: VercelResponse,
) {
    const message = request.body;
    const buf = await buffer(request);
    
    const signature = request.headers["x-signature-ed25519"];
    const timestamp = request.headers["x-signature-timestamp"];

    const isValidRequest = verifyKey(buf.toString("utf8"), signature as string, timestamp as string, process.env.PUBLIC_KEY as string);

    if (!isValidRequest) {
        return response.status(401).end("Bad request signature");
    }

    const commands = await getCommands();

    if (message.type === InteractionType.Ping) {
        return response.status(200).send({
            type: InteractionResponseType.Pong,
        })
    }

    if (message.type === InteractionType.ApplicationCommand) {
        if (commands[message.data.name]) {
            const result = await commands[message.data.name].run(
                prismaClient,
                message.member,
                optionsArrayToObject(message.data.options)
            );
            return response.status(200).send(result);
        }
    }

    response.end();
}