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
  let count = 0;
  let max = -Infinity;
  for (let p2 = 0; p2 < n; p2 += 1) {
    sum += arr[p2];
    count++;
    if (count === target) {
      max = Math.max(max, sum);
      count -= 1;
      sum -= arr[p1++];
    }
  }
  console.log(max);
}

solution();
