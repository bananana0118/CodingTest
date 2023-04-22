let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split(' ');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution() {
  const [m, n] = input.map(Number);
  const answer = [];
  const visited = new Array(m + 1).fill(0);
  function dfs(l, visited) {
    if (l === n) {
      console.log(answer.join(' '));
      return;
    } else {
      for (let i = 1; i <= m; i += 1) {
        if (visited[i] !== 1) {
          answer.push(i);
          visited[i] = 1;
          //참조가 유지되는 객체가 아니라 카피뜬 객체를 줘야함
          dfs(l + 1, visited.slice());
          answer.pop(i);
        }
      }
    }
  }

  dfs(0, visited);
}

solution();
