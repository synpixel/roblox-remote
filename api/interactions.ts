import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  InteractionResponseType,
  InteractionType,
} from "discord-api-types/v10";
import type { Readable } from "node:stream";
import nacl from "tweetnacl";

import login from "../src/commands/login.js";
const commands = { login };

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

async function isVerified(request: VercelRequest) {
  const buf = await buffer(request);

  const signature = request.headers["x-signature-ed25519"];
  const timestamp = request.headers["x-signature-timestamp"];
  const rawBody = buf.toString("utf8");

  return nacl.sign.detached.verify(
    Buffer.from(timestamp + rawBody),
    Buffer.from(signature as string, "hex"),
    Buffer.from(PUBLIC_KEY, "hex")
  );
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (!(await isVerified(request))) {
    return response.status(401).end("invalid request signature");
  }

  if (request.body.type == InteractionType.Ping) {
    response.json({
      type: InteractionResponseType.Pong,
    });
  } else if (request.body.type == InteractionType.ApplicationCommand) {
    console.log("isApplicationCommand");

    const command = commands[request.body.data.name];

    if (command) {
      console.log("doesExist");
      command(request.body).then((data) => {
        console.log(data);
        response.json({
          type: InteractionResponseType.ChannelMessageWithSource,
          data,
        });
      });
    }
  }
}
