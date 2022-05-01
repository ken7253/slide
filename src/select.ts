import inquirer from 'inquirer';

import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

/** 設定情報 */
const config = {
  slideRoot: 'slides',
};

/**
 * 格納されたすべてのスライドのファイル名を取得する関数
 * @returns 取得できたファイル名の配列
 */
const fetchAllSlide = () => {
  const slideDir = path.join(process.cwd(), config.slideRoot);
  const files = fs.readdirSync(slideDir);

  return files;
};

/** 選択されたスライドのパス */
const getSlide = (fileName: string) => {
  const slideDir = path.join(config.slideRoot, fileName);
  return slideDir;
};

const exec = () => {
  console.log(`Searching for slides.\n at ${path.join(process.cwd(), config.slideRoot)}`);
  if (fetchAllSlide().length === 0) {
    console.log('\u001b[31m' + '[ERROR] No slides were available.' + '\u001b[0m');
    return;
  }

  inquirer
    .prompt({
      name: 'select',
      type: 'list',
      choices: fetchAllSlide(),
    })
    .then((value) => {
      const selectedSlide = getSlide(value.select);
      const slidev = spawn('npm', ['run', 'dev', '--', selectedSlide]);

      slidev.stdout.on('data', (data) => {
        console.log(`[LOG] ${data}`);
      });

      slidev.stderr.on('data', (data) => {
        console.error(`[ERROR] ${data}`);
      });

      slidev.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    });
};

exec();
