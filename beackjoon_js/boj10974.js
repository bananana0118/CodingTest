let fs = require('fs');
//const input = fs.readFileSync(__dirname + '/example.txt').toString();
const input = fs.readFileSync('/dev/stdin').toString();

function solution(n) {
  visited = new Array(n).fill(0);

  function dfs(depth) {
    if (depth === n) {
      console.log(visited.join(' '));
      return;
    } else {
      for (let i = 1; i <= n; i += 1) {
        if (visited.includes(i)) continue;
        visited[depth] = i;
        dfs(depth + 1);
        visited[depth] = 0;
      }
    }
  }

  dfs(0);
}
solution(parseInt(input));
