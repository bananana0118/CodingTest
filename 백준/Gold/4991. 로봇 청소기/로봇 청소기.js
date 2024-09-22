const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

let index = 0;
let [w, h] = input[index++].trim().split(" ").map(Number);

// 큐 구현 (BFS용)
class Node {
    constructor(item) {
        this.item = item;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(item) {
        const node = new Node(item);
        if (this.head === null) {
            this.head = node;
        } else {
            this.tail.next = node;
        }
        this.tail = node;
        this.length += 1;
    }

    pop() {
        if (this.length === 0) return null;

        const popItem = this.head;
        this.head = this.head.next;
        this.length -= 1;

        if (this.head === null) {
            this.tail = null;
        }

        return popItem.item;
    }
}

// BFS 구현 (최단 거리 계산)
function bfs(start_r, start_c, map, w, h) {
    const queue = new Queue();
    queue.push([start_r, start_c]);
    let visited = Array.from({ length: h }, () => new Array(w).fill(-1));
    visited[start_r][start_c] = 0;

    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    while (queue.length !== 0) {
        let [r, c] = queue.pop();
        if ([r, c] === undefined) continue;

        for (let i = 0; i < 4; i++) {
            let [dr, dc] = directions[i];
            let nr = r + dr;
            let nc = c + dc;

            if (
                nr < 0 ||
                nr >= h ||
                nc < 0 ||
                nc >= w ||
                map[nr][nc] === "x" ||
                visited[nr][nc] !== -1
            )
                continue;
            visited[nr][nc] = visited[r][c] + 1;
            queue.push([nr, nc]);
        }
    }

    return visited;
}

// DFS (백트래킹) 구현 - 순열을 계산하며 최소 거리 찾기
function calculateMinDistance(startPos, dustPos, distance) {
    let minDistance = Infinity;
    const n = dustPos.length;
    const visited = Array(n).fill(false);

    function dfs(currentPos, currentDistance, depth) {
        if (depth === n) {
            minDistance = Math.min(minDistance, currentDistance);
            return;
        }

        for (let i = 0; i < n; i++) {
            if (!visited[i]) {
                visited[i] = true;
                const nextDistance = distance[currentPos][i + 1];  // 더러운 칸은 1번부터 시작

                if (nextDistance !== Infinity) {
                    dfs(i + 1, currentDistance + nextDistance, depth + 1);
                }

                visited[i] = false;  // 백트래킹
            }
        }
    }

    dfs(0, 0, 0);  // 시작점(0)에서 DFS 시작
    return minDistance === Infinity ? -1 : minDistance;
}

// 테스트 케이스 입력 처리
while (w !== 0 && h !== 0) {
    let map = [];
    const dusts = [];
    let start_r = 0;
    let start_c = 0;

    // 맵 받아오기
    for (let i = 0; i < h; i++) {
        map.push(input[index++].trim().split(""));
    }

    // 시작점과 더러운 칸의 위치 찾기
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            if (map[i][j] === "o") {
                start_r = i;
                start_c = j;
            } else if (map[i][j] === "*") {
                dusts.push([i, j]);
            }
        }
    }

    const n = dusts.length;
    const position = [[start_r, start_c], ...dusts];
    const distances = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity));

    // BFS를 사용하여 각 위치에서 다른 위치까지의 최단 거리 계산
    let validPath = true;
    for (let i = 0; i <= n; i++) {
        const bfsResult = bfs(position[i][0], position[i][1], map, w, h);
        for (let j = 0; j <= n; j++) {
            const distance = bfsResult[position[j][0]][position[j][1]];
            if (distance === -1) {
                validPath = false;  // 갈 수 없는 더러운 칸이 존재하는 경우
            }
            distances[i][j] = distance;
        }
    }

    // 더러운 칸을 방문하는 최단 경로 계산
    if (!validPath) {
        console.log(-1);  // 더러운 칸에 갈 수 없는 경우
    } else {
        const dirtyIndexes = Array.from({ length: n }, (_, i) => i + 1);
        console.log(calculateMinDistance(0, dirtyIndexes, distances));  // 시작점은 0
    }

    // 다음 테스트 케이스 처리
    [w, h] = input[index++].trim().split(" ").map(Number);
}
