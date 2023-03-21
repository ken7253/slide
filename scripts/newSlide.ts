import { exec } from "node:child_process";
import inquirer from "inquirer";

const crateWorkspace = () => {
  inquirer
    .prompt({
      name: "slideName",
      message: "Enter slide name",
      type: "input",
    })
    .then((answer) => {
      exec(`npm init -w ${answer.slideName} -y`, (err) => console.log(err));
    });
};

crateWorkspace();
