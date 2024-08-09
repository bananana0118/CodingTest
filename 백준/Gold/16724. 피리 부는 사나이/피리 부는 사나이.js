const input = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((item) => item.trim());

const [nm, ...matrix] = input;
const [rows, cols] = input[0].split(" ").map(Number);

//행이 3개고 열이 4개인 그래프 만듬
const graph = Array.from(Array(rows), () => new Array(cols).fill(""));
//사이클을 탐색할 visited 초기화
const visited = Array.from(Array(rows), () => new Array(cols).fill(0));
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        graph[i][j] = matrix[i][j];
    }
}

//safezone count 초기화
let safeZoneCount = 0;

const dfs = (x, y) => {
    if (visited[x][y] === 1) {
        safeZoneCount += 1;
        return;
    }

    //현재 방문한 셀을 마크
    visited[x][y] = 1;
    let nx,
        ny = 0;
    switch (graph[x][y]) {
        case "U":
            nx = x - 1;
            ny = y;
            break;
        case "D":
            nx = x + 1;
            ny = y;
            break;
        case "L":
            nx = x;
            ny = y - 1;
            break;
        case "R":
            nx = x;
            ny = y + 1;
            break;
    }

    //재귀 탐색
    if (visited[nx][ny] !== 2) dfs(nx, ny);

    visited[x][y] = 2;
};

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (visited[i][j] === 0) dfs(i, j);
    }
}

console.log(safeZoneCount);
