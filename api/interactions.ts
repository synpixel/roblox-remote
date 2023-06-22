import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  InteractionResponseType,
  InteractionType,
} from "discord-api-types/v10";
import fs from "fs";
import type { Readable } from "node:stream";
import nacl from "tweetnacl";

const PUBLIC_KEY: string =
  "91d29c9a2d217ba9decd8c028ed56036fbf7429767676d55a89cfec1b255a991";

async function buffer(readable: Readable) {
  const chunks: Buffer[] = [];
  for await (const chunk of readable) {
    chunks.push(
      typeof chunk == "string" ? Buffer.from(chunk) : (chunk as Buffer)
    );
  }
  return Buffer.concat(chunks);
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const buf = await buffer(request);

  const signature = request.headers["X-Signature-Ed25519"];
  const timestamp = request.headers["X-Signature-Timestamp"];
  const rawBody = buf.toString("utf8");

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + request.body),
    Buffer.from(signature as string, "hex"),
    Buffer.from(PUBLIC_KEY, "hex")
  );

  if (!isVerified) {
    return response.status(401).end("invalid request signature");
  }

  if (request.body.type == InteractionType.Ping) {
    response.json({
      type: InteractionResponseType.Pong,
    });
  } else if (request.body.type == InteractionType.ApplicationCommand) {
    if (fs.existsSync(`src/commands/${request.body.name}.ts`)) {
      import(`src/commands/${request.body.name}.ts`).then((command) => {
        command(request.body).then((content: string) => {
          response.json({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: { content },
          });
        });
      });
    }
  }
}
