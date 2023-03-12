import fs from "fs";
import path from "path";
import { Command, Commands } from "./types";

const commands: Commands = {};
const commandNames = fs.readdirSync(path.join(__dirname, "commands"), {
    withFileTypes: true
});

let registeredCommands = false;

async function registerCommands() {
    for (const commandDirent of commandNames) {
        const commandName = commandDirent.name;

        if (commandName.endsWith(".map")) {
            continue;
        }

        try {
            const commandFilePath = path.join(__dirname, "commands", commandName);
            const command: { default: Command } = await import(commandFilePath);
            const commandBaseName = path.basename(commandFilePath, path.extname(commandFilePath));
    
            if (command) {
                commands[commandBaseName] = command.default;
            }
        } catch {
            console.warn(`There was an issue adding the command: ${commandName}`)
        }
    }
}

export default async function getCommands() {
    if (!registeredCommands) {
        registeredCommands = true;
        await registerCommands();
    }

    return commands;
}