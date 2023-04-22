const fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');

//const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution(input) {
  const [n, m] = input[0].split(' ').map(Number);
  input.shift();
  const N = input.length;
  const inDegree = {};
  const graph = Array.from(new Array(n + 1), () => []);
  const result = [];
  const cost = new Array(n + 1).fill(1);
  function topologySort() {
    const q = [];
    for (let i = 1; i <= N; i += 1) {
      if (inDegree[i] === 0) q.push(i);
    }

    //간선제거
    for (let i = 1; i <= n; i += 1) {
      if (q.length === 0) return; ///사이클 발생
      let a = q.shift();
      result.push(a);
      for (let j = 0; j < graph[a].length; j += 1) {
        const x = graph[a][j];
        inDegree[x] = inDegree[x] - 1;
        cost[x] = cost[a] * 1 + 1;
        if (inDegree[x] === 0) {
          q.push(x);
        }
      }
    }
  }

  for (let i = 0; i < N; i += 1) {
    const [pre, after] = input[i].split(' ').map(Number);
    graph[pre].push(after);
    inDegree[pre] = inDegree[pre] ?? 0;
    inDegree[after] = (inDegree[after] ?? 0) + 1;
  }
  topologySort();
  cost.shift();
  console.log(cost.join(' '));
}

solution(input);
