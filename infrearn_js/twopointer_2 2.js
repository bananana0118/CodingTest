let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');
let index = 0;
function solution() {
  const n = parseInt(input[index++]);
  const arr1 = input[index++]
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);
  const m = parseInt(input[index++]);
  const arr2 = input[index++]
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);
  let p1 = (p2 = 0);
  const answer = [];
  while (p1 < n && p2 < m) {
    if (arr1[p1] === arr2[p2]) {
      answer.push(arr1[p1]);
      p1++;
      p2++;
    } else if (arr1[p1] < arr2[p2]) {
      p1++;
    } else {
      p2++;
    }
  }
  console.log(answer.join(' '));
}

solution();
