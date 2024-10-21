const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

let index = 0;
const stack = [];
const inputs = [];

for (let i = 0; i < input.length; i++) {
    if (isNaN(input[i]) || input[i] === 0) break;
    inputs.push(Number(input[i]));
}
let result = [];

stack.push([0, inputs.length - 1]);

while (stack.length) {
    const [start, end] = stack.pop();

    if (start > end) continue;

    const rootValue = inputs[start];
    let rightSubTreeIndex = end + 1; // 범위를 초과하게 해서 탐색하지 않게함

    //start는 root의 index여서 +1해준다
    for (let i = start + 1; i <= end; i++) {
        if (inputs[i] > rootValue) {
            rightSubTreeIndex = i;
            break;
        }
    }

    //새로운 시작점과 오른쪽 서브트리
    stack.push([start + 1, rightSubTreeIndex - 1]); // 왼쪽 서브트리
    stack.push([rightSubTreeIndex, end]);

    result.unshift(rootValue); //현재 루트발루 넣기.
}

console.log(result.join("\n"));
