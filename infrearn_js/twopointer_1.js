let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');
let index = 0;
function solution() {
  const n = parseInt(input[index++]);
  const arr1 = input[index++].split(' ').map(Number).sort();
  const m = parseInt(input[index++]);
  const arr2 = input[index++].split(' ').map(Number).sort();
  const arr = {};
  const answer = [];
  for (val of arr1) {
    arr[val] = (arr[val] ?? 0) + 1;
  }
  for (val of arr2) {
    arr[val] = (arr[val] ?? 0) + 1;
  }

  for (const [key, value] of Object.entries(arr)) {
    if (value > 1) answer.push(key);
  }
  console.log(answer.join(' '));
}

solution();
