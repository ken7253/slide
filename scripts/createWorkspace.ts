import path from "node:path";
import { writeFile, mkdir, cp } from "node:fs/promises";
import childProcess from "node:child_process";
import { promisify, parseArgs } from "node:util";

import dayjs from "dayjs";
import inquirer from "inquirer";

import { reservedDirChars } from "./util/reservedDirChars.ts";

/** Promise like execFile. シェルを経由しないため引数のエスケープが不要。 */
const execFile = promisify(childProcess.execFile);

const usage = [
  "Usage: node ./scripts/createWorkspace.ts [--workspace <name>]",
  "",
  "Options:",
  "  -w, --workspace <name>  workspace name, skips the interactive prompt",
].join("\n");

/** 既定のワークスペース名（本日の日付） */
const defaultWorkspaceName = () =>
  dayjs(new Date()).format("YYYY-MM-DD").toString();

/** 引数のパース。解釈できない引数が渡された場合はusageを表示して終了する。 */
const parseOptions = () => {
  try {
    return parseArgs({
      options: {
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

const createWorkspace = async (name: string | null) => {
  const workspaceName = name ?? defaultWorkspaceName();

  try {
    await execFile("npm", ["init", "-w", workspaceName, "-y"]);
  } catch (err) {
    console.error(`[Error]  Failed to create ${workspaceName}`);
    console.error(err);
    process.exitCode = 1;
    return;
  }

  // コマンドの設定
  // 同じpackage.jsonを更新するため、1回のnpm pkg setでまとめて設定する
  const scripts = [
    ["dev", "slidev"],
    ["build", "slidev build"],
    ["export", "slidev export"],
  ];
  const makeScriptsTask = execFile("npm", [
    "pkg",
    "set",
    ...scripts.map(
      ([scriptName, scriptCommand]) => `scripts.${scriptName}=${scriptCommand}`,
    ),
    `-w=${workspaceName}`,
  ]);

  // スライドファイルの作成
  const templateFilePath = path.join(
    process.cwd(),
    "scripts",
    "assets",
    "slides.md",
  );
  const slideFilePath = path.join(process.cwd(), workspaceName, "slides.md");

  const copyTemplateTask = cp(templateFilePath, slideFilePath);

  const styleDir = path.join(process.cwd(), workspaceName, "styles");
  const makeStyleFileTask = mkdir(styleDir).then(async () => {
    await writeFile(
      path.join(styleDir, "index.ts"),
      'import "./mod.css"\nimport "@slide/reuse/styles";',
    );
    await writeFile(path.join(styleDir, "mod.css"), "");
  });

  const taskGroup = [makeScriptsTask, copyTemplateTask, makeStyleFileTask];
  const results = await Promise.allSettled(taskGroup);
  const rejected = results.filter((result) => result.status === "rejected");

  if (rejected.length > 0) {
    console.error(`[Error]  Failed to create ${workspaceName}`);
    rejected.forEach((result) => console.error(result.reason));
    process.exitCode = 1;
    return;
  }

  console.log(`[Done] Create ${workspaceName}`);
};

/** ワークスペース名として使用できるかどうかの検証 */
const validateWorkspaceName = (input: string) =>
  reservedDirChars.test(input)
    ? "ディレクトリ名に指定できない文字列が含まれています"
    : true;

const { workspace } = parseOptions();

// ワークスペース名が指定されている場合はプロンプトを起動せずに作成する
if (typeof workspace === "string") {
  const validationResult = validateWorkspaceName(workspace);
  if (typeof validationResult === "string") {
    console.error(`[Error]  ${validationResult}`);
    process.exit(1);
  }
  await createWorkspace(workspace === "" ? null : workspace);
} else {
  const answer = await inquirer.prompt([
    {
      name: "workspaceName",
      type: "input",
      message: "Enter a workspace name.",
      validate: validateWorkspaceName,
      default: defaultWorkspaceName(),
    },
  ]);
  const { workspaceName } = answer;
  if (typeof workspaceName === "string") {
    await createWorkspace(workspaceName === "" ? null : workspaceName);
  }
}
