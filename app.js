const fs = require('fs');
const chalk = require('chalk');

/**
 * Synchronously reads the content of 'declaration.txt'.
 * @returns {string} The content of the file.
 */
function readFileContent() {
    return fs.readFileSync('declaration.txt', 'utf8');
}

/**
 * Gets the word count from the content.
 * @param {string} content The file content.
 * @returns {Object} An object with words as keys and their occurrences as values.
 */
function getWordCounts(content) {
    const words = content.match(/\b\w+\b/g);
    const wordCounts = {};

    words.forEach(word => {
        const normalizedWord = word.toLowerCase();
        if (wordCounts[normalizedWord]) {
            wordCounts[normalizedWord]++;
        } else {
            wordCounts[normalizedWord] = 1;
        }
    });

    return wordCounts;
}

/**
 * Colors a word based on its frequency.
 * @param {string} word The word to be colored.
 * @param {number} count The frequency of the word.
 * @returns {string} The colored word.
 */
function colorWord(word, count) {
    if (count === 1) {
        return chalk.blue(word);
    } else if (count <= 5) {
        return chalk.green(word);
    } else {
        return chalk.red(word);
    }
}

/**
 * Prints the first 15 lines of the content with colored words.
 * This function replaces punctuation (non-word characters) with a space,
 * while preserving pure whitespace.
 *
 * @param {string} content The file content.
 * @param {Object} wordCount An object containing word occurrences.
 */
function printColoredLines(content, wordCount) {
    const lines = content.split('\n').slice(0, 15);

    for (const line of lines) {
        const coloredLine = line.split(/(\W+)/).map(token => {
            if (/^\s+$/.test(token)) {
                // Preserve pure whitespace.
                return token;
            } else if (/^\W+$/.test(token)) {
                // Replace punctuation and other non-word tokens with a space.
                return ' ';
            }
            // Color the word based on its frequency.
            return colorWord(token, wordCount[token.toLowerCase()] || 0);
        }).join('');

        console.log(coloredLine);
    }
}

/**
 * Main function to read the file, count the word occurrences, and print the colored lines.
 */
function processFile() {
    const content = readFileContent();
    const wordCount = getWordCounts(content);
    printColoredLines(content, wordCount);
}

if (require.main === module) {
    // This will execute only if the file is run directly.
    processFile();
}

module.exports = {
    readFileContent,
    getWordCounts,
    colorWord,
    printColoredLines,
    processFile
};
