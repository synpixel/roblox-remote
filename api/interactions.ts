import type { VercelRequest, VercelResponse } from '@vercel/node';
import { InteractionResponseType, InteractionType, verifyKey } from 'discord-interactions';
import type { Readable } from 'node:stream';

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
    
    const signature = request.headers["X-Signature-Ed25519"];
    const timestamp = request.headers["X-Signature-Timestamp"];

    const isValidRequest = verifyKey(buf.toString("utf8"), signature as string, timestamp as string, process.env.PUBLIC_KEY as string);

    if (!isValidRequest) {
        return response.status(401).end("Bad request signature");
    }

    if (message.type === InteractionType.APPLICATION_COMMAND) {
        response.status(200).send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: "hello yes"
            }
        });
    } else {
        response.status(200).end()
    }
}