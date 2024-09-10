class Node {
    constructor(item) {
        this.item = item;
        this.next = null;
    }
}

// Queue 구현
class Queue {
    constructor() {
        this.front = null;
        this.rear = null;
        this.length = 0;
    }

    add(value) {
        const node = new Node(value);
        if (this.length === 0) {
            this.front = node;
        } else {
            this.rear.next = node;
        }
        this.rear = node;
        this.length += 1;
    }

    shift() {
        if (this.length === 0) {
            return null;
        }
        const temp = this.front;
        this.front = this.front.next;
        this.length -= 1;
        return temp.item;
    }

    isEmpty() {
        return this.length === 0;
    }
}

const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs").readFileSync(inputFile).toString().trim().split("\n");

let index = 0;
const [K] = input[index++].split(" ").map(Number); // 말처럼 이동 가능한 횟수
const [N, M] = input[index++].split(" ").map(Number); // 가로 N, 세로 M

const map = [];
for (let i = 0; i < M; i++) {
    map.push(input[index++].trim().split(" ").map(Number));
}

// 3차원 방문 배열: visited[x][y][남은 말 이동 횟수]
const visited = Array.from({ length: M }, () =>
    Array.from({ length: N }, () => Array(K + 1).fill(false))
);

// 상하좌우 이동
const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

// 말의 이동
const knightMoves = [
    [-2, -1], [-1, -2], [-2, 1], [-1, 2],
    [1, -2], [2, -1], [1, 2], [2, 1]
];

// 큐 생성 및 시작점 초기화
const q = new Queue();
q.add([0, 0, K, 0]); // (row, col, 남은 말 이동 횟수, 이동한 횟수)
visited[0][0][K] = true;

const BFS = () => {
    while (!q.isEmpty()) {
        const [r, c, k, count] = q.shift();

        // 도착지점에 도착한 경우
        if (r === M - 1 && c === N - 1) {
            return count;
        }

        // 말처럼 이동할 수 있는 경우
        if (k > 0) {
            for (let i = 0; i < knightMoves.length; i++) {
                const [dr, dc] = knightMoves[i];
                const nr = r + dr;
                const nc = c + dc;

                if (
                    nr < 0 || nr >= M || nc < 0 || nc >= N || 
                    map[nr][nc] === 1 || visited[nr][nc][k - 1]
                ) {
                    continue;
                }

                visited[nr][nc][k - 1] = true;
                q.add([nr, nc, k - 1, count + 1]);
            }
        }

        // 상하좌우로 이동
        for (let i = 0; i < directions.length; i++) {
            const [dr, dc] = directions[i];
            const nr = r + dr;
            const nc = c + dc;

            if (
                nr < 0 || nr >= M || nc < 0 || nc >= N || 
                map[nr][nc] === 1 || visited[nr][nc][k]
            ) {
                continue;
            }

            visited[nr][nc][k] = true;
            q.add([nr, nc, k, count + 1]);
        }
    }

    return -1; // 도착지점에 도달할 수 없는 경우
};

console.log(BFS());
