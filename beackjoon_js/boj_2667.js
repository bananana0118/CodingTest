const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
let input = require('fs').readFileSync(filePath).toString().trim().split('\n');
let index = 0;

let N = parseInt(input[index++]);
//동서남북
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
const result = [0];
const solution = () => {
  const visited = Array.from({ length: N }, () => new Array(N).fill(0));
  const matrix = new Array(N);

  for (let i = 0; i < N; i += 1) {
    matrix[i] = input[index++].split('').map(Number);
  }
  for (let i = 0; i < N; i += 1) {
    for (let j = 0; j < N; j += 1) {
      if (matrix[i][j] === 1 && visited[i][j] === 0) {
        const count = BFS(i, j);
        result[0] += 1;
        result.push(count);
      }
    }
  }

  function BFS(iy, ix) {
    const queue = [];
    let count = 0;
    queue.push([iy, ix]);
    visited[iy][ix] = 1;
    while (queue.length > 0) {
      const [y, x] = queue.shift();
      count += 1;

      for (let i = 0; i < 4; i += 1) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (
          nx < 0 ||
          nx >= N ||
          ny < 0 ||
          ny >= N ||
          visited[ny][nx] === 1 ||
          matrix[ny][nx] === 0
        )
          continue;
        queue.push([ny, nx]);
        visited[ny][nx] = 1;
      }
    }
    return count;
  }

  const counts = result.slice(1);

  console.log(result[0]);
  console.log(counts.sort((a, b) => a - b).join('\n'));
};

solution();
