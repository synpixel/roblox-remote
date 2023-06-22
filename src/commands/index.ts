import fs from "fs";
import path from "path";

const commands = {};

for (const file in fs.readdirSync(__dirname, { withFileTypes: true })) {
  const fileName = path.basename(file, path.extname(file));

  if (fileName == "index") continue;

  const command = await import(path.join(__dirname, file));
  commands[fileName] = command.default;
}

export default commands;
