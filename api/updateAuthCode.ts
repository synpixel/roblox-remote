import type { VercelRequest, VercelResponse } from '@vercel/node';
import prismaClient from '../src/prismaClient';

export default async function(
    request: VercelRequest,
    response: VercelResponse,
) {
    if (!(request.body.userId && request.body.code)) {
        return response.status(401).send({ error: "Invalid userId or code" });
    }

    if (request.headers["secret-key"] == process.env.SECRET_KEY) {
        const userData = await prismaClient.userData.findUnique({
            where: {
                robloxId: request.body.userId
            }
        });

        if (!userData) {
            await prismaClient.robloxUserAuth.upsert({
                create: {
                    robloxId: request.body.userId,
                    code: request.body.code
                },
                update: {
                    code: request.body.code
                },
                where: {
                    robloxId: request.body.userId
                }
            });

            response.status(200).end();
        }
    } else {
        response.status(401).send({ error: "Invalid secret key" });
    }
}