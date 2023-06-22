import fs from "fs";
import path from "path";

const commands = {};

for (const file in fs.readdirSync(__dirname, { withFileTypes: true })) {
  const fileName = path.basename(file, path.extname(file));

  if (fileName == "index") continue;

  import(path.join(__dirname, file)).then((command) => {
    commands[fileName] = command.default;
  });
}

export default commands;
