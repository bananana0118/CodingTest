const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(filePath)
    .toString()
    .trim()
    .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let sum = 0;
//초기화
for (let i = 0; i < m; i++) {
    sum += arr[i];
}

//최대값 갱신
let maxSum = sum;
for (let i = 1; i + m - 1 < arr.length; i++) {
    sum = sum - arr[i - 1] + arr[i + m - 1];
    maxSum = Math.max(sum, maxSum);
}

console.log(maxSum);
