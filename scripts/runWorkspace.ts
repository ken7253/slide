import { readdir } from "node:fs/promises";
import { statSync } from "node:fs";
import { spawn } from "child_process";
import path from "node:path";
import inquirer from "inquirer";

const ignoreDirName = ["node_modules", "scripts", "reuse"];

(async (commandOption?: string[]) => {
  const command =
    commandOption?.find((v) => v.match("--command="))?.split("=")[1] ?? "dev";
  const fileNameList = await readdir(process.cwd());
  const dirNameList = fileNameList.filter((fileName) => {
    const isHiddenFile = [".", "_"].includes(fileName[0]);
    if (isHiddenFile) return false;

    const isIgnoreDir =
      typeof ignoreDirName.find((v) => v === fileName) === "string";
    if (isIgnoreDir) return false;

    const absolutePath = path.join(process.cwd(), fileName);
    const fileStats = statSync(absolutePath);

    return fileStats.isDirectory();
  });

  if (dirNameList.length === 0) {
    const messages = [
      "[Error]  Could not detect workspace",
      "[Info]   settings:ignore",
    ];
    console.log(messages.join("\n"));
    console.dir(ignoreDirName);
    return;
  }

  inquirer
    .prompt({
      type: "list",
      name: "dirName",
      message: "select workspace",
      choices: dirNameList,
    })
    .then((answers) => {
      const { dirName } = answers;
      spawn("npm", ["run", command, "-w", dirName], {
        stdio: "inherit",
      });
    })
    .catch((err) => console.log(err));
})(process.argv.slice(2));
