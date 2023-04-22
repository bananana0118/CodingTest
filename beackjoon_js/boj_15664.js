let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution(input) {
  const [N, M] = input[0].split(' ').map(Number);
  const nums = input[1].split(' ').map(Number);
  nums.sort((a, b) => a - b);
  const visited = new Array(N).fill(0);
  const answer = [];
  function dfs(values, count) {
    if (count === M) {
      answer.push(values.join(' '));
    }

    for (let i = 0; i < N; i += 1) {
      if (visited[i] === 0) {
        if (values.length !== 0 && values[values.length - 1] > nums[i]) {
          continue;
        }
        visited[i] = 1;
        values.push(nums[i]);
        dfs(values.slice(0), count + 1);
        visited[i] = 0;
        values.pop();
      }
    }
  }

  dfs([], 0);
  const set = new Set(answer);
  let newAnswer = [...set];

  console.log(newAnswer.join('\n'));
}
solution(input);
