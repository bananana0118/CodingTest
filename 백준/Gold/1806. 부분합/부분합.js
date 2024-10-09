const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

let index = 0;

const [N, S] = input[index++].trim().split(" ").map(Number);
const array = input[index++].trim().split(" ").map(Number);

//알고리즘 파악
let start = 0; //시작 포인터, 끝포인터를 0으로 설정
let end = 0;
let total = 0;
let minLength = Infinity;

while (end < array.length) {
    //포인터값이 S를 넘으면 반복 종료

    total += array[end]; //누적 값 증가
    end += 1; //포인터 증가

    while (total >= S) {
        //S보다 클때까지만 증가
        minLength = Math.min(minLength, end - start);
        total -= array[start];
        start++;
    }
}

console.log(minLength === Infinity ? 0 : minLength);
