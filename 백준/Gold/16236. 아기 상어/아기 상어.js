const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs").readFileSync(inputFile).toString().trim().split("\n");

const N = Number(input[0]);
let space = [];
let shark = { x: 0, y: 0, size: 2, eaten: 0 };
const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1]
];

for (let i = 1; i <= N; i++) {
    space.push(input[i].split(" ").map(Number));
    for (let j = 0; j < N; j++) {
        if (space[i - 1][j] === 9) {
            shark.x = i - 1;
            shark.y = j;
            space[i - 1][j] = 0; // 아기 상어 위치를 0으로
        }
    }
}

// BFS로 물고기 탐색
function bfs() {
    let queue = [[shark.x, shark.y, 0]]; // [x, y, 거리]
    let visited = Array.from({ length: N }, () => Array(N).fill(false));
    visited[shark.x][shark.y] = true;
    
    let candidates = [];
    let minDistance = Number.MAX_SAFE_INTEGER;

    while (queue.length) {
        const [x, y, dist] = queue.shift();

        // 현재까지의 거리가 가장 가까운 물고기보다 크면 탐색 종료
        if (dist > minDistance) break;

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx >= 0 && ny >= 0 && nx < N && ny < N && !visited[nx][ny]) {
                visited[nx][ny] = true;
                // 상어가 이동할 수 있는 칸
                if (space[nx][ny] <= shark.size) {
                    // 먹을 수 있는 물고기 찾음
                    if (space[nx][ny] > 0 && space[nx][ny] < shark.size) {
                        candidates.push([nx, ny, dist + 1]);
                        minDistance = dist + 1;
                    } else {
                        // 물고기는 없지만 이동 가능
                        queue.push([nx, ny, dist + 1]);
                    }
                }
            }
        }
    }

    // 먹을 수 있는 물고기 리스트 정렬
    if (candidates.length > 0) {
        candidates.sort((a, b) => {
            if (a[2] !== b[2]) return a[2] - b[2]; // 거리가 작은 순
            if (a[0] !== b[0]) return a[0] - b[0]; // 가장 위쪽
            return a[1] - b[1]; // 가장 왼쪽
        });
        return candidates[0]; // 가장 가까운 물고기 반환
    }

    return null;
}

// 시뮬레이션 실행
let time = 0;

while (true) {
    const fish = bfs();

    if (fish === null) {
        // 더 이상 먹을 수 있는 물고기가 없으면 종료
        break;
    }

    const [fishX, fishY, distance] = fish;
    shark.x = fishX;
    shark.y = fishY;
    time += distance;

    shark.eaten += 1;
    if (shark.eaten === shark.size) {
        shark.size += 1;
        shark.eaten = 0;
    }

    space[fishX][fishY] = 0; // 물고기를 먹었으니 해당 칸은 빈 칸이 됨
}

console.log(time);
