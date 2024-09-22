const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

let index = 0;
const str1 = input[index++].trim().split("");
const str2 = input[index].trim().split("");
let arr = Array.from({ length: str1.length + 1 }, () =>
    new Array(str2.length + 1).fill(0)
);

function sol(s1, s2) {
    let answer = 0;

    for (let i = 0; i < s1.length; i++) {
        for (let j = 0; j < s2.length; j++) {
            if (s1[i] === s2[j]) {
                arr[i + 1][j + 1] = arr[i][j] + 1;
                if (arr[i + 1][j + 1] > answer) answer = arr[i + 1][j + 1];
            } else {
                arr[i + 1][j + 1] = 0;
            }
        }
    }
    return answer;
}

console.log(sol(str1, str2));
