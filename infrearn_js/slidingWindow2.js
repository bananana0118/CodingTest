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
  let sum = 0;
  let max = -Infinity;
  for (let i = 0; i < target; i += 1) sum += arr[i];
  max = sum;
  for (let i = target; i < n; i += 1) {
    sum += arr[i] - arr[i - target];
    max = Math.max(sum, max);
  }
  console.log(max);
}

solution();
