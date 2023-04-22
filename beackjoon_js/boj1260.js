let fs = require('fs');
// const input = fs
//   .readFileSync(__dirname + '/example.txt')
//   .toString()
//   .split('\n');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution(input) {
  const [node, n, v] = input[0].split(' ').map(Number);
  const graph = new Array(node + 1);
  for (let i = 0; i < node + 1; i += 1) {
    graph[i] = [];
  }
  for (let i = 1; i <= n; i += 1) {
    let [from, to] = input[i].split(' ').map(Number);
    graph[from].push(to);
    graph[to].push(from);
  }
  //오름차순 정렬
  graph.forEach(e => {
    e.sort((a, b) => a - b);
  });

  //0번은 안쓸거라서
  let visited = new Array(node + 1).fill(0);
  let ans_dfs = [];

  function DFS(v) {
    if (visited[v]) return;
    visited[v] = 1;
    ans_dfs.push(v);
    for (let i = 0; i < graph[v].length; i += 1) {
      let nxt = graph[v][i];
      if (visited[nxt] === 0) DFS(nxt);
    }
  }

  DFS(v);

  visited.fill(0);
  let ans_bfs = [];

  function BFS(v) {
    let q = [v];
    while (q.length !== 0) {
      let x = q.shift();
      if (visited[x] === 1) {
        continue;
      }
      visited[x] = 1;
      ans_bfs.push(x);
      for (let i = 0; i < graph[x].length; i += 1) {
        let nxt = graph[x][i];
        if (visited[nxt] === 0) {
          q.push(nxt);
        }
      }
    }
  }

  BFS(v);
  console.log(ans_dfs.join(' '));
  console.log(ans_bfs.join(' '));
}

solution(input);
