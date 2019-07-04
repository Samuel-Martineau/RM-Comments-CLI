const { prompt } = require('inquirer');
const chalk = require('chalk');
const { fileExists, getExtensionOfExistingFile, getExtensionOfNotExistingFile } = require('./files');
const isValidPath = require('is-valid-path');

module.exports = {
    askForInputAndOutputFile: () => {
        const questions = [
            {
                name: 'inputFile',
                type: 'input',
                message: chalk.yellow('Enter the path of the file from wich you want to remove the comments'),
                validate: value => {
                    if (value.length > 0 && fileExists(value) && getExtensionOfExistingFile(value) === '.js') {
                        return true;
                    } else {
                        return chalk.red('Please enter a valid javascript file path');
                    }
                }
            },
            {
                name: 'outputFile',
                type: 'input',
                message: chalk.yellow('Enter the ouput file path'),
                validate: value => {
                    if (value.length > 0 && isValidPath(value) && getExtensionOfNotExistingFile(value) === '.js') {
                        return true;
                    } else {
                        return chalk.red('Please enter a valid file path');
                    }
                }
            }
        ];
        return prompt(questions);
    }
};