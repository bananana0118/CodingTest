const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./example.txt")
    .toString()
    .trim()
    .split("\n")
    .map((item) => item.trim());

const [info, ...matrix] = input;
const [N, M, K] = info.split(" ").map(Number);

//큐구현
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
    pop(item) {
        const popItem = this.head;
        this.head = this.head.next;
        this.length -= 1;
        return popItem.item;
    }
}

//그래프만들기
const myMap = [];

for (let i = 0; i < N; i++) {
    myMap.push(matrix[i].split("").map(Number));
}

const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => Array(K + 1).fill(false))
);

//방향
const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];
const queue = new Queue();
// 큐에 초기 상태 추가 (시작점에서 출발, 벽을 아직 부수지 않은 상태)
queue.push([0, 0, 0, 1]);
visited[0][0][0] = true;

const BFS = () => {
    while (queue.length > 0) {
        const [y, x, broken, distance] = queue.pop();

        if (y == N - 1 && x == M - 1) {
            console.log(distance);
            return;
        }

        //방향에 따라 돌기
        for (let [dy, dx] of directions) {
            const ny = y + dy;
            const nx = x + dx;

            //유효한 좌표인지 확인
            if (ny < 0 || ny >= N || nx >= M || nx < 0) continue;

            //벽을 부수지 않고 이동가능한 경우 = 해당 위치가 0 이고 방문안한경우
            if (myMap[ny][nx] === 0 && !visited[ny][nx][broken]) {
                //큐에 해당좌표 넣어주기
                queue.push([ny, nx, broken, distance + 1]);
                visited[ny][nx][broken] = true;
            }

            //벽을 부수고 이동 가능한 경우 해당위치가 1이고 벽횟수가 남은경우
            if (
                myMap[ny][nx] === 1 &&
                broken < K &&
                !visited[ny][nx][broken + 1]
            ) {
                queue.push([ny, nx, broken + 1, distance + 1]);
                visited[ny][nx][broken + 1] = true;
            }
        }
    }
    console.log(-1);
};

BFS();
