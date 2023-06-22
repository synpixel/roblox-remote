import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  InteractionResponseType,
  InteractionType,
} from "discord-api-types/v10";
import fs from "fs";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
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
            data: {
              content,
            },
          });
        });
      });
    }
  }
}
