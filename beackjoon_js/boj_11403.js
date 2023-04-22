let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .trim()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution(input) {
  const N = Number.parseInt(input[0]);
  const result = Array.from(Array(N), () => new Array(N).fill(0));
  let graph = new Array(N);

  for (let i = 1; i <= N; i += 1) {
    graph[i - 1] = input[i].split(' ').map(Number);
  }
  for (let i = 0; i < N; i += 1) {
    result[i] = BFS(i);
  }

  for (let i = 0; i < N; i += 1) {
    console.log(result[i].join(' '));
  }

  function BFS(start) {
    const visited = Array.from(new Array(N), () => new Array(N).fill(0));
    const q = [];

    const result = [];
    q.push(start);

    while (q.length > 0) {
      const node = q.shift();
      for (let j = 0; j < N; j += 1) {
        if (visited[node][j] === 0 && graph[node][j] === 1) {
          q.push(j);
          visited[node][j] = 1;
          result.push(j);
        }
      }
    }
    const temp = Array(N).fill(0);
    for (let i = 0; i < result.length; i += 1) {
      const idx = result[i];
      temp[idx] = 1;
    }
    return temp;
  }
}

solution(input);
