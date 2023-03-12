import type { PrismaClient } from "@prisma/client";
import { APIApplicationCommandInteractionDataOption, APIGuildMember } from 'discord-api-types/v10';

export type CommandOptions = {[name: string]: APIApplicationCommandInteractionDataOption};

export type Command = {
    run: (prismaClient: PrismaClient, member: APIGuildMember, options: CommandOptions) => ({any?: any})
};

export type Commands = {
    [name: string]: Command
};