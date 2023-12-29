import path from "node:path";
import { writeFile, mkdir, cp } from "node:fs/promises";
import childProcess from "node:child_process";
import { promisify } from "node:util";

import dayjs from "dayjs";
import inquirer from "inquirer";

import { reservedDirChars } from "./util/reservedDirChars.js";

/** Promise like exec. */
const exec = promisify(childProcess.exec);

const crateWorkspace = (name: string | null) => {
  const workspaceName =
    name ?? dayjs(new Date()).format("YYYY-MM-DD").toString();

  exec(`npm init -w ${workspaceName} -y`)
    .catch((err) => console.log(err))
    .then(() => {
      // コマンドの設定
      const scripts = [
        ["dev", "slidev"],
        ["build", "slidev build"],
        ["export", "slidev export"],
      ];
      const makeScriptsTask = scripts.map((script) => {
        const command = `npm pkg set scripts.${script[0]}="${script[1]}" -w=${workspaceName}`;
        return exec(command);
      });

      // スライドファイルの作成
      const templateFilePath = path.join(
        process.cwd(),
        "scripts",
        "assets",
        "slides.md"
      );
      const slideFilePath = path.join(
        process.cwd(),
        workspaceName,
        "slides.md"
      );

      const copyTemplateTask = cp(templateFilePath, slideFilePath);

      const styleDir = path.join(process.cwd(), workspaceName, "styles");
      const makeStyleFileTask = mkdir(styleDir).then(() => {
        writeFile(
          path.join(styleDir, "index.ts"),
          'import "./mod.css"\nimport "@slide/reuse/styles";'
        );
        writeFile(path.join(styleDir, "mod.css"), "");
      });

      const taskGroup = [makeScriptsTask, copyTemplateTask, makeStyleFileTask];
      Promise.allSettled(taskGroup).then(() =>
        console.log(`[Done] Create ${workspaceName}`)
      ).catch((e) => {
        console.log(e)
      });
    });
};

inquirer
  .prompt([
    {
      name: "workspaceName",
      type: "input",
      message: "Enter a workspace name.",
      validate: (input) =>
        reservedDirChars.test(input)
          ? "ディレクトリ名に指定できない文字列が含まれています"
          : true,
      default: dayjs(new Date()).format("YYYY-MM-DD").toString(),
    },
  ])
  .then((answer) => {
    const { workspaceName } = answer;
    if (typeof workspaceName === "string") {
      crateWorkspace(workspaceName === "" ? null : workspaceName);
    }
  });
