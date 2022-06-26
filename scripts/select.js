import inquirer from 'inquirer';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
const config = {
    slideRoot: 'slides',
};
const fetchAllSlide = () => {
    const slideDir = path.join(process.cwd(), config.slideRoot);
    const ls = fs.readdirSync(slideDir);
    const markdownFiles = ls.filter((file) => {
        return path.extname(file) === '.md';
    });
    return markdownFiles;
};
const getSlide = (fileName) => {
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
        const slidev = spawn('npm', ['x', '-p', 'slidev', getSlide(value.select)]);
        slidev.stdout.on('data', (data) => {
            console.log(`[LOG] \n${data}`);
        });
        slidev.stderr.on('data', (data) => {
            console.error(`[ERROR] \n${data}`);
        });
        slidev.on('close', (code) => {
            console.log(`[LOG] Child process exited with code ${code}`);
        });
    });
};
exec();
