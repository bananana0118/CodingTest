const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

let index = 0;

const N = Number(input[index++].trim());
let maxTime = 0;
let timeTable = Array.from(N + 1).fill(0);
const [time, orders] = input[index++].split(" ").map(Number);

timeTable[0] = 0;

timeTable[1] = time;

for (let i = 2; i < N + 1; i++) {
    const [time, orderCount, ...orders] = input[index++].split(" ").map(Number);
    maxTime = 0;

    for (let j = 0; j < orderCount; j++) {
        maxTime = Math.max(maxTime, timeTable[orders[j]]);
    }

    timeTable[i] = maxTime + time;
}

console.log(Math.max(...timeTable));
