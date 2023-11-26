const fs = require('fs');

function getInput(inputFile, delimiter = "\n") {
    try {
        return fs.readFileSync(inputFile, "utf-8").trimEnd().split(delimiter)
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
}

module.exports = getInput;