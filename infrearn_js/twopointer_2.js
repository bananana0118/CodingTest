let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '\\example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');
let index = 0;
function solution() {
  const n = parseInt(input[index++]);
  const arr1 = input[index++].split(' ').map(Number);
  const m = parseInt(input[index++]);
  const arr2 = input[index++].split(' ').map(Number);
  let p1 = (p2 = 0);
  let answer = [];
  while (p1 < n && p2 < m) {
    if (arr1[p1] <= arr2[p2]) {
      answer.push(arr1[p1++]);
    } else {
      answer.push(arr2[p2++]);
    }
  }
  if (p1 < n) {
    answer = [...answer, ...arr1.slice(p1)];
  } else {
    answer = [...answer, ...arr2.slice(p2)];
  }
  console.log(answer);
}

solution();
