let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution(input) {
  const [N, M] = input[0].split(' ').map(Number);
  input.shift();
  const trust = Array.from(new Array(N + 1), () => []);
  const cost = new Array(N + 1).fill(0);
  for (let i = 0; i < M; i += 1) {
    const [to, from] = input[i].split(' ').map(Number);
    trust[from].push(to);
  }

  function DFS(start) {
    const stack = [start];
    const visited = Array.from({ length: N + 1 }, () => false);

    let count = 0;
    let result = 0;
    count += 1;
    while (stack.length !== 0) {
      let curr = stack.pop();
      if (result < count) result = count;

      visited[curr] = true;
      for (let i = 0; i < trust[curr].length; i += 1) {
        let value = trust[curr][i];
        if (visited[value]) continue;
        visited[value] = true;
        count += 1;
        stack.push(value);
      }
    }
    return count;
  }
  let maxItem = -1;
  for (let node = 1; node < N + 1; node += 1) {
    cost[node] = DFS(node);
    if (cost[node] > maxItem) maxItem = cost[node];
  }

  const answer = [];

  for (let i = 1; i < N + 1; i += 1) {
    if (cost[i] === maxItem) answer.push(i);
  }

  console.log(answer.join(' '));
}
solution(input);
