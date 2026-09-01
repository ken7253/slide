import { readdir } from "node:fs/promises";
import { statSync } from "node:fs";
import { spawn } from "node:child_process";
import path from "node:path";
import { parseArgs } from "node:util";

import inquirer from "inquirer";

const ignoreDirName = ["node_modules", "scripts", "reuse"];

const usage = [
  "Usage: node ./scripts/runWorkspace.ts [--command=<name>] [--workspace <name>]",
  "",
  "Options:",
  "  --command=<name>        script to run in the workspace (default: dev)",
  "  -w, --workspace <name>  target workspace, skips the interactive prompt",
].join("\n");

/** 引数のパース。解釈できない引数が渡された場合はusageを表示して終了する。 */
const parseOptions = () => {
  try {
    return parseArgs({
      options: {
        command: { type: "string", default: "dev" },
        workspace: { type: "string", short: "w" },
      },
      allowPositionals: false,
    }).values;
  } catch (err) {
    console.error(`[Error]  ${err instanceof Error ? err.message : err}`);
    console.error(usage);
    process.exit(1);
  }
};

/** ワークスペースに対してnpm scriptsを実行し、終了コードを引き継ぐ。 */
const runWorkspace = (command: string, dirName: string) => {
  const child = spawn("npm", ["run", command, "-w", dirName], {
    stdio: "inherit",
  });
  child.on("close", (code) => process.exit(code ?? 1));
};

(async () => {
  const { command = "dev", workspace } = parseOptions();
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
    console.error(messages.join("\n"));
    console.dir(ignoreDirName);
    process.exit(1);
  }

  // ワークスペースが指定されている場合はプロンプトを起動せずに実行する
  if (typeof workspace === "string") {
    if (!dirNameList.includes(workspace)) {
      const messages = [
        `[Error]  Could not find workspace: ${workspace}`,
        "[Info]   available workspaces:",
        ...dirNameList.map((v) => `         - ${v}`),
      ];
      console.error(messages.join("\n"));
      process.exit(1);
    }
    runWorkspace(command, workspace);
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
      runWorkspace(command, dirName);
    })
    .catch((err) => console.log(err));
})();
