import type { PrismaClient } from '@prisma/client';
import { APIGuildMember, ApplicationCommandOptionType, InteractionResponseType } from 'discord-api-types/v10';
import getTypeError from '../debug/getTypeError';
import { CommandOptions } from '../types';

export default {
  run: async function(prismaClient: PrismaClient, member: APIGuildMember, options: CommandOptions) {
    if (options.code.type != ApplicationCommandOptionType.String) {
        return getTypeError(ApplicationCommandOptionType.String, options.code.type)
    };

    if (!member.user) {
        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: "Couldn't resolve user"
            }
        }
    }
    
    const userAuthData = await prismaClient.robloxUserAuth.findUnique({
        where: {
            code: options.code.value
        }
    });
    
    if (userAuthData) {
        await prismaClient.robloxUserAuth.delete({
            where: {
                robloxId: userAuthData.robloxId
            }
        });

        await prismaClient.userData.upsert({
            where: { discordId: member.user.id },
            update: { robloxId: userAuthData.robloxId },
            create: {
                discordId: member.user.id,
                robloxId: userAuthData.robloxId
            },
        });

        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: `Successful login. Hello, **${userAuthData.robloxId}**!`
            }
        }
    } else {
        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: "Invalid code. Try again."
            }
        }
    }
  }
}