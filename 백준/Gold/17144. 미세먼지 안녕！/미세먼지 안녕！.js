const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

let index = 0;
const [R, C, T] = input[index++].split(" ").map(Number);
const map = [];
const cleaner = [];

// 초기 맵과 공기청정기 위치 설정
for (let i = 0; i < R; i++) {
    const row = input[index++].split(" ").map(Number);
    map.push(row);
    if (row[0] === -1) cleaner.push(i);
}

// 방향 설정 (위, 아래, 왼쪽, 오른쪽)
const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1]
];

// 미세먼지 확산
function spreadDust() {
    const tempMap = map.map(row => [...row]);
    
    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            if (map[r][c] > 0) {
                const spreadAmount = Math.floor(map[r][c] / 5);
                let spreadCount = 0;
                
                for (const [dr, dc] of directions) {
                    const nr = r + dr;
                    const nc = c + dc;
                    if (nr >= 0 && nr < R && nc >= 0 && nc < C && map[nr][nc] !== -1) {
                        tempMap[nr][nc] += spreadAmount;
                        spreadCount++;
                    }
                }
                
                tempMap[r][c] -= spreadAmount * spreadCount;
            }
        }
    }
    
    for (let r = 0; r < R; r++) {
        map[r] = [...tempMap[r]];
    }
}

// 공기청정기 작동 (위쪽 반시계방향)
function activateTopCleaner() {
    const top = cleaner[0];

    for (let i = top - 1; i > 0; i--) map[i][0] = map[i - 1][0];
    for (let i = 0; i < C - 1; i++) map[0][i] = map[0][i + 1];
    for (let i = 0; i < top; i++) map[i][C - 1] = map[i + 1][C - 1];
    for (let i = C - 1; i > 1; i--) map[top][i] = map[top][i - 1];
    map[top][1] = 0;
}

// 공기청정기 작동 (아래쪽 시계방향)
function activateBottomCleaner() {
    const bottom = cleaner[1];

    for (let i = bottom + 1; i < R - 1; i++) map[i][0] = map[i + 1][0];
    for (let i = 0; i < C - 1; i++) map[R - 1][i] = map[R - 1][i + 1];
    for (let i = R - 1; i > bottom; i--) map[i][C - 1] = map[i - 1][C - 1];
    for (let i = C - 1; i > 1; i--) map[bottom][i] = map[bottom][i - 1];
    map[bottom][1] = 0;
}

// 시뮬레이션 실행
for (let t = 0; t < T; t++) {
    spreadDust();
    activateTopCleaner();
    activateBottomCleaner();
}

// 남은 미세먼지의 양 계산
let result = 0;
for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
        if (map[r][c] > 0) result += map[r][c];
    }
}

console.log(result);
