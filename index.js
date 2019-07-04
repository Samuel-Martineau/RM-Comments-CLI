#!/usr/bin/env node
const figlet = require('figlet');
const clear = require('clear');
const strip = require('strip-comments');
const fs = require('fs');
const chalk = require('chalk');
const { askForInputAndOutputFile } = require('./lib/inquirer');
const { writeFile } = require('./lib/files');

const run = async() => {
    clear();
    console.log(
        chalk.yellow(figlet.textSync('RMC   CLI'))
    );
    const { inputFile, outputFile } = await askForInputAndOutputFile();
    const inputFileContent = fs.readFileSync(inputFile).toString().split('\n');
    let outputFileContent = `${inputFileContent[0]}`;
    if(!inputFileContent[0].startsWith('#!') && inputFileContent[1]) outputFileContent = inputFileContent[1].replace(/\n/g, '');
    let outputFileCode = '';
    inputFileContent.shift();
    inputFileContent.forEach(str => {
        outputFileCode += `\n${str}`;
    });
    outputFileContent += strip(outputFileCode);

    writeFile(outputFile, outputFileContent);
};

run();