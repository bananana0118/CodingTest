const fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');
//const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution(input) {
  const [N, K] = input[0].split(' ').map(Number);
  const numArr = input[1].split(' ').map(Number);
  let maxLen = 0;
  const mapArr = new Array(N + 1).fill(0);
  let start = 0;
  let end = 0;

  while (start <= end && end < N) {
    const k = numArr[end];
    while (mapArr[k] === K) {
      const q = numArr[start];
      mapArr[q] -= 1;
      start += 1;
    }
    maxLen = Math.max(maxLen, end - start + 1);

    mapArr[k] = (mapArr[k] ?? 0) + 1;
    end += 1;
  }
  console.log(maxLen);
}
solution(input);
