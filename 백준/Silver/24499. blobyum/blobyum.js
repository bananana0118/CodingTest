const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);

function maxApplePieSum(N, K, arr) {
    const doubled = arr.concat(arr);

    let sum = 0;

    for (let i = 0; i < K; i++) {
        sum += doubled[i];
    }

    let maxSum = sum;

    for (let i = 1; i < N; i++) {
        sum = sum - doubled[i - 1] + doubled[i + K - 1];
        maxSum = Math.max(maxSum, sum);
    }

    return maxSum;
}

const answer = maxApplePieSum(N, K, nums);
console.log(answer);
