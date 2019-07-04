const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = {
    fileExists: (filePath) => fs.existsSync(filePath),
    getExtensionOfExistingFile: (filePath) => path.extname(filePath).toLowerCase(),
    getExtensionOfNotExistingFile: (filePath) => `.${filePath.split('.').reverse()[0].toLowerCase()}`,
    writeFile: (filePath, content) => {
        mkdirp(path.dirname(filePath), err => {
            if (err) return err;
            fs.writeFileSync(filePath, content);
        });
    }
};