let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '\\example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');
let index = 0;
function solution() {
  const [n, target] = input[index++].split(' ').map(Number);
  const arr = input[index++].split(' ').map(Number);
  let p1 = (p2 = 0);
  let sum = 0;
  let answer = 0;

  while (p1 < n && p2 < n) {
    sum += arr[p2];
    while (sum > target) {
      sum -= arr[p1++];
    }
    answer += p2 - p1 + 1;
    p2++;
  }
  console.log(answer);
}

solution();
