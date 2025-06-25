const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const arr = [];
for (let i = 1; i <= N; i++) {
    const [g, x] = input[i].split(" ").map(Number);
    arr.push([g, x]);
}
if (N === 1) {
    console.log(arr[0][0]);
    return;
}

//nlogn
arr.sort((a, b) => a[1] - b[1]);
let len = arr[N - 1][1];
//초기화
let sum = 0;
let maxSum = 0;
const queue = [];
let p = 0;
for (let i = 0; i < N; i++) {
    //0일때 오른쪽
    if (arr[i][1] > K) {
        break;
    }
    p++;
    queue.push(arr[i]);
    sum += arr[i][0];
}

maxSum = sum;
//슬라이딩 윈도우

let idx = 1;
while (p < N) {
    if (queue.length > 0 && queue[0][1] < idx - K) {
        sum -= queue[0][0];
        queue.shift(); //앞빼기
    }
    while (p < N && arr[p][1] <= idx + K) {
        queue.push(arr[p]); //뒤 넣기
        sum += arr[p][0];
        maxSum = Math.max(sum, maxSum);
        p++;
    }

    idx++;
}
console.log(maxSum);
