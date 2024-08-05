import { readFile } from 'node:fs/promises';
import path from 'node:path';

import inquirer from 'inquirer';

import { reservedDirChars } from './util/reservedDirChars.js';

/** プロパティの存在チェックと型の絞り込みを行う形ガード */
const hasWorkspaces = (packageJSON: object): packageJSON is { workspaces: string[] } => {
  const hasProperty = Object.hasOwn(packageJSON, 'workspaces');
  if (!hasProperty) return false;
  const isArray = Array.isArray((packageJSON as { workspaces: unknown }).workspaces);
  return isArray;
};

(async () => {
  const packageJSONPath = path.join(process.cwd(), 'package.json');
  const rawPackageJSON = await readFile(packageJSONPath, { encoding: 'utf-8' });
  const parsedJSON: unknown = JSON.parse(rawPackageJSON);
  if (parsedJSON instanceof Object && hasWorkspaces(parsedJSON)) {
    const removeReuse = (workspaces: string[]) => {
      return workspaces.filter((v) => v !== 'reuse');
    };
    const workspaceList = removeReuse(parsedJSON.workspaces);

    inquirer
      .prompt([
        {
          type: 'list',
          choices: workspaceList,
          name: 'currentName',
          message: 'Select the name of the workspace you wish to change.',
        },
        {
          type: 'input',
          name: 'newName',
          message: 'Enter a new workspace name.',
          validate: (input) => {
            return reservedDirChars.test(input) ? 'The string entered cannot be used as a directory name.' : true;
          },
        },
      ])
      .then((answer) => {
        if (!(answer instanceof Object)) return;
        const hasAnswer = (v: unknown): v is { currentName: unknown; newName: unknown } => {
          if (!(v instanceof Object)) return false;
          const hasCurrentName = Object.hasOwn(v, 'currentName');
          const hasNewName = Object.hasOwn(v, 'newName');

          return hasCurrentName && hasNewName;
        };

        if (hasAnswer(answer)) {
          // 具体的なリネーム処理
        }
      });
  }
})();
