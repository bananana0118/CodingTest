let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .trim()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');
//완전탐색, DFS같다.
const [N, S] = input[0].split(' ').map(Number);
const nums = input[1].split(' ').map(Number);
let result = 0;
function solution(input) {
  DFS(0, []);
  console.log(result);
}

function DFS(deps, summ) {
  if (deps === N) return;
  summ.push(nums[deps]);
  let sums = summ.reduce((pre, curr) => pre + curr, 0);
  if (sums === S) {
    result += 1;
  }

  DFS(deps + 1, summ.slice(0));
  summ.pop();
  DFS(deps + 1, summ.slice(0));
}

solution(input);
