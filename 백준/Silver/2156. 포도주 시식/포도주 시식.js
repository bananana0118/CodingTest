const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

let index = 0;

const N = Number(input[index++]);
let arr = [];
let dp = new Array(N).fill(0);
for (let i = 0; i < N; i++) {
    arr.push(Number(input[index++]));
}

dp[0] = arr[0];
dp[1] = arr[0] + arr[1];
dp[2] = Math.max(dp[1], dp[0] + arr[2], arr[1] + arr[2]);

for (let i = 3; i < N; i++) {
    dp[i] = Math.max(
        dp[i - 1], //지금 잔 (세번째 잔 안마심)
        dp[i - 2] + arr[i], // 두번째 잔 안 마심
        dp[i - 3] + arr[i] + arr[i - 1] //첫번째 잔 안 마심
    );
}

console.log(dp[N - 1]);
