
const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

// 나머지 빈도 카운팅 배열
const modCount = new Array(M).fill(0);
let prefixSum = 0;
let count = 0;

// 누적 합 계산 및 나머지 처리
for (let i = 0; i < N; i++) {
    prefixSum += arr[i];
    const mod = prefixSum % M;

    // 나머지가 음수일 경우 M을 더해 양수로 만듦
    const positiveMod = (mod + M) % M;

    // 나머지가 0인 경우는 직접 카운트 증가
    if (positiveMod === 0) count++;

    // 동일한 나머지를 가진 이전 구간의 개수를 추가
    count += modCount[positiveMod];

    // 현재 나머지 빈도 증가
    modCount[positiveMod]++;
}

console.log(count);
