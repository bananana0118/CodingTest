let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution(input) {
  const n = input.shift() - 0;
  const numArr = input[0].split(' ').map(Number);
  const cost = new Array(n).fill(Infinity);
  cost[0] = 0;
  for (let i = 1; i < n; i += 1) {
    for (let j = 0; j < i; j += 1) {
      //더 큰 값이 더 멀리간 값,
      power = Math.max(
        (i - j) * (1 + Math.abs(numArr[i] - numArr[j])),
        cost[j],
      );

      //i까지 구한 최소값과 위에서 구한 power(i와 j 사이의 값과, j까지 의 값 중 최대값 )값을 넣어서 비교해줌
      cost[i] = Math.min(cost[i], power);
    }
  }
  console.log(cost[n - 1]);
}
solution(input);
