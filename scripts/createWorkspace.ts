import path from "node:path";
import { writeFile, mkdir, cp } from "node:fs/promises";
import childProcess from "node:child_process";
import { promisify } from "node:util";
import dayjs from "dayjs";

const exec = promisify(childProcess.exec);

const crateWorkspace = (name?: string) => {
  const workspaceName =
    name ?? dayjs(new Date()).format("YYYY-MM-DD").toString();

  exec(`npm init -w ${workspaceName} -y`)
    .catch((err) => console.log(err))
    .then(() => {
      // コマンドの設定
      [
        ["dev", "slidev"],
        ["build", "slidev build"],
        ["export", "slidev export"],
      ].forEach((script) => {
        exec(
          `npm pkg set scripts.${script[0]}="${script[1]}" -w=${workspaceName}`
        );
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

      cp(templateFilePath, slideFilePath).catch((err) => console.log(err));
      const styleDir = path.join(process.cwd(), workspaceName, "styles");
      mkdir(styleDir)
        .then(() => {
          writeFile(
            path.join(styleDir, "index.ts"),
            'import "./mod.css"\nimport "@slide/reuse/styles";'
          );
          writeFile(path.join(styleDir, "mod.css"), "");
        })
        .catch((err) => console.log(err));
    });
};

crateWorkspace();
