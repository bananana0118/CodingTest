const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./example.txt")
    .toString()
    .trim()
    .split("\n")
    .map((item) => item.trim());

//큐 구현
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
        const popItem = this.head;
        this.head = this.head.next;
        this.length -= 1;
        return popItem.item;
    }

    length() {
        return this.length;
    }
}

const xx = [0, 0, -1, 1];
const yy = [-1, 1, 0, 0];
const solution = (matrix, len) => {
    const visited = Array.from({ length: len }, () => Array(len).fill(Infinity));
    const queue = [];
    queue.push([0, 0, matrix[0][0]]);
    visited[0][0] = matrix[0][0];
    while (queue.length > 0) {
        queue.sort((a, b) => a[2] - b[2]);
        const [y, x, cost] = queue.shift();

        if (x === len - 1 && y === len - 1) return cost;
        if (
            visited[len - 1][len - 1] !== 0 &&
            visited[y][x] > visited[len - 1][len - 1]
        )
            continue;
        //상하좌우로 이동
        for (let i = 0; i < 4; i++) {
            const dx = x + xx[i];
            const dy = y + yy[i];

            //범위체크
            if (dx < 0 || dx >= len || dy < 0 || dy >= len) continue;
            const newCost = cost + matrix[dy][dx];
            if (newCost < visited[dy][dx]) {
                visited[dy][dx] = newCost;
                queue.push([dy, dx, newCost]);
            }
        }
    }
    return visited[len - 1][len - 1];
};

//배열만들고
let cnt = 0;
let count = 1;
while ((len = Number(input[cnt++]))) {
    let matrix = [];

    for (let i = cnt; i < cnt + len; i++) {
        matrix.push(input[i].split(" ").map(Number));
    }

    cnt += len;

    const answer = solution(matrix, len);

    console.log(`Problem ${count++}: ${answer}`);
}
