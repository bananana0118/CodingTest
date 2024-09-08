const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const map = new Array(M);

let start = [];
let end = [];
let target = 0;
let items = [];
for (let i = 1; i <= M; i++) {
    const startIdx = input[i].indexOf("S");
    const endIdx = input[i].indexOf("E");

    if (startIdx !== -1) {
        start = [i - 1, startIdx];
    }
    if (endIdx !== -1) {
        end = [i - 1, endIdx];
    }
    map[i - 1] = input[i]
        .trim()
        .replaceAll("#", "0")
        .replaceAll(".", "1")
        .replaceAll("X", "2")
        .replaceAll("S", "3")
        .replaceAll("E", "4")
        .split("")
        .map(Number);

    target += map[i - 1].filter((item) => item === 2).length;
}

for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
        if (map[i][j] === 2) items.push([i, j]);
    }
}

// target은 물건의 총 개수입니다
const visited = Array.from({ length: M }, () =>
    Array.from({ length: N }, () => Array(1 << target).fill(false))
);

//상 하 좌 우
const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

const q = [];

let minMove = Infinity;
let move = 0;

const BFS = () => {
    q.push([start[0], start[1], 0, 0]);

    visited[start[0]][start[1]][0] = true;
    //큐에 넣고
    while (q.length !== 0) {
        const [r, c, state, steps] = q.shift(); //추후 만들어서 하기

        //큐에서 팝
        if (map[r][c] === 4 && state === (1 << target) - 1) {
            return steps;
        }

        //현재위치에서 상하좌우로 이동
        for (let i = 0; i < 4; i++) {
            const direction = directions[i];
            const dr = r + direction[0];
            const dc = c + direction[1];

            //범위 넘어가면 continue
            if (dr < 0 || dr >= M || dc < 0 || dc >= N || map[dr][dc] === 0)
                continue;

            let newState = state;

            // 물건을 찾은 경우, 상태 업데이트
            if (map[dr][dc] === 2) {
                for (let i = 0; i < items.length; i++) {
                    if (dr === items[i][0] && dc === items[i][1]) {
                        newState |= 1 << i;  // 비트마스크로 상태 업데이트
                        break;
                    }
                }
            }

            //방문하지 않은 장소라면
            if (!visited[dr][dc][newState]) {
                //이동
                visited[dr][dc][newState] = true;
                q.push([dr, dc, newState, steps + 1]);
            }
        }
    }

    return minMove;

    //챙겨야할 아이템 찾고 최소거리 갱신
};
console.log(BFS());
