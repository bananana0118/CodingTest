const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

let index = 0;

let T = input[index++].trim().split("").map(Number);

function sol(T) {
    let count = T;
    while (count > 0) {
        let distance = 0;

        let str1 = input[index++].trim();
        let str2 = input[index++].trim();

        for (let i = 0; i < str1.length; i++) {
            if (str1[i] ^ str2[i]) distance++;
        }

        console.log(`Hamming distance is ${distance}.`);

        count--;
    }
}

sol(T);
