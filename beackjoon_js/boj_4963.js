let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

//값 입력받는 부분

//bfs돌리는 부분
//방향 이동하는 부분
const dx = [1, -1, 0, 0, -1, 1, -1, 1]; //동서남북 좌대상 우대상 좌대하 우대하
const dy = [0, 0, 1, -1, -1, -1, 1, 1];

function solution() {
  while (true) {
    const [w, h] = input[0].split(' ').map(Number);
    if (w === 0 && h === 0) break;
    let count = 0;
    input.splice(0, 1);

    const board = getTable(w, h);
    input.splice(0, h);
    const visited = Array.from(Array(h), () => new Array(w).fill(0));

    for (let i = 0; i < h; i += 1) {
      for (let j = 0; j < w; j += 1) {
        if (visited[i][j] === 0 && board[i][j] === 1) {
          bfs(i, j, board, visited, w, h);
          count += 1;
        }
      }
    }
    console.log(count);
  }
}

function bfs(ypos, xpos, board, visited, w, h) {
  const queue = [];
  queue.push({ ypos: ypos, xpos: xpos });
  visited[ypos][xpos] = 1;

  while (queue.length) {
    const { ypos, xpos } = queue.shift();
    for (let i = 0; i < 8; i += 1) {
      const nx = xpos + dx[i];
      const ny = ypos + dy[i];
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      if (visited[ny][nx] === 0 && board[ny][nx] === 1) {
        visited[ny][nx] = 1;
        queue.push({ ypos: ny, xpos: nx });
      }
    }
  }
}
function getTable(w, h) {
  const table = new Array(h);
  for (let i = 0; i < h; i += 1) {
    table[i] = input[i].split(' ').map(Number);
  }
  return table;
}
solution();
