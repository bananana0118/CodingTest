const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
let input = require('fs').readFileSync(filePath).toString().trim().split('\n');
let index = 0;
//완전탐색? 완전탐색인것 같기도하고bfs ?dfs? 최소비용이란 걸 보니까 bfs 같기도 하다
const N = parseInt(input[index++]);

const solution = () => {
  const cost = new Array(N);
  for (let i = 0; i < N; i += 1) {
    cost[i] = input[index++].split(' ').map(Number);
  }
  const visited = Array.from({ length: N }, () => 0);
  let minCost = Infinity;

  findRouteDFS(0, [], visited, 0, -1);

  console.log(minCost);

  function findRouteDFS(depth, arr, visited, myCost, prev) {
    if (depth === N) {
      if (cost[prev][arr[0]] === 0) return;
      myCost += cost[arr[N - 1]][arr[0]];

      minCost = Math.min(minCost, myCost);
      return;
    }

    for (let i = 0; i < N; i += 1) {
      if (visited[i] === 0) {
        if (prev !== -1) {
          if (cost[prev][i] === 0) return;
          myCost += cost[prev][i];
        }
        arr.push(i);
        visited[i] = 1;
        findRouteDFS(depth + 1, arr.slice(0), visited.slice(0), myCost, i);
        visited[i] = 0;
        arr.pop();

        if (prev === -1) myCost = 0;
        else myCost -= cost[prev][i];
      }
    }
  }
};
solution();
