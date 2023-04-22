const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .replace(/\r/g, '')
  .split('\n');
function solution(input) {
  const N = input[0] * 1;
  const sin = new Array(N + 1).fill(0);
  const sson = new Array(N + 1).fill(0);
  const visited = new Array(N).fill(0);
  let minValue = Infinity;
  for (let i = 1; i < N + 1; i += 1) {
    const [v1, v2] = input[i].split(' ').map(Number);
    sin[i - 1] = v1;
    sson[i - 1] = v2;
  }

  function DFS(L, mult, plus, visited) {
    if (L === N) {
      if (!visited.includes(1)) return;

      const value = Math.abs(mult - plus);
      if (value < minValue) minValue = value;
      return;
    }

    visited[L] = 1;
    DFS(L + 1, mult * sin[L], plus + sson[L], visited.slice(0));
    visited[L] = 0;
    DFS(L + 1, mult, plus, visited.slice(0));
  }

  if (N === 1) {
    minValue = Math.abs(sin[0] - sson[0]);
  } else {
    DFS(0, 1, 0, visited);
  }
  console.log(minValue);
}
solution(input);
