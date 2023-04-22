let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .trim()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution(input) {
  const [n, m] = input[0].split(' ').map(Number);
  const matrix = Array.from(Array(n), () => new Array(m).fill(0));
  const visited = Array.from(Array(n), () => new Array(m).fill(0));
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  for (let i = 0; i < n; i += 1) {
    matrix[i] = input[i + 1].split('').map(Number);
  }
  function bfs(x, y) {
    const q = [];
    q.push([x, y]);
    while (q.length > 0) {
      const [x, y] = q.shift();
      for (let i = 0; i < 4; i += 1) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (0 <= nx && nx < n && 0 <= ny && ny < m && matrix[nx][ny] === 1) {
          q.push([nx, ny]);
          matrix[nx][ny] = matrix[x][y] + 1;
        }
      }
    }
  }
  visited[0][0] = 1;
  bfs(0, 0);

  console.log(matrix[n - 1][m - 1]);
}

solution(input);
