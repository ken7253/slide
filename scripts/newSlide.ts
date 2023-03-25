import path from "node:path";
import { writeFile, mkdir, cp } from "node:fs/promises";
import { execSync, exec } from "node:child_process";
import dayjs from "dayjs";

const crateWorkspace = (name?: string) => {
  const workspaceName =
    name ?? dayjs(new Date()).format("YYYY-MM-DD").toString();
  exec(`npm init -w ${workspaceName} -y`, (err) => {
    if (err) {
      console.log(err);
    } else {
      // コマンドの設定
      [
        ["dev", "slidev"],
        ["build", "slidev build"],
        ["export", "slidev export"],
      ].forEach((scripts) => {
        execSync(
          `npm set-script -w ${workspaceName} ${scripts[0]} ${scripts[1]}`
        );
      });
      // スライドファイルの作成
      const templateFilePath = path.join(
        process.cwd(),
        "scripts",
        "assets",
        "slide.md"
      );
      const slideFilePath = path.join(process.cwd(), workspaceName, "slide.md");
      cp(templateFilePath, slideFilePath).catch((err) => console.log(err));

      const styleDir = path.join(process.cwd(), workspaceName, "styles");
      mkdir(styleDir)
        .then(() => {
          writeFile(path.join(styleDir, "index.ts"), 'import "./mod.css"');
          writeFile(path.join(styleDir, "mod.css"), "");
        })
        .catch((err) => console.log(err));
    }
  });
};

crateWorkspace();
