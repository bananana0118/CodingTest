const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

const documents = input[0];
const word = input[1];
let count = 0;
let i = 0;
while (i < documents.length) {
    const tempword = documents.slice(i, i + word.length);
    if (tempword == word) {
        i = i + word.length;
        count++;
        continue;
    }
    i++;
}

console.log(count);
