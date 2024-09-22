const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

let index = 0;
let [w, h] = input[index++].trim().split(" ").map(Number);

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
        if (this.length === 0) return null;
        const popItem = this.head;
        this.head = this.head.next;
        this.length -= 1;

        // head가 null이 되면 tail도 null로 처리
        if (this.head === null) {
            this.tail = null;
        }
        return popItem.item;
    }
}

function permutation(arr, selectNum) {
    let result = [];
    if (selectNum === 1) return arr.map((v) => [v]);

    arr.forEach((v, idx, arr) => {
        const fixed = v;
        const restArr = arr.filter((v, index) => idx !== index);
        const permutationArr = permutation(restArr, selectNum - 1);
        const combineArr = permutationArr.map((v) => [fixed, ...v]);
        result.push(...combineArr);
    });

    return result;
}

function bfs(start_r, start_c, map, w, h) {
    const queue = new Queue();
    queue.push([start_r, start_c]);
    let visited = Array.from({ length: h }, (_) => new Array(w).fill(-1));
    visited[start_r][start_c] = 0;

    while (queue.length !== 0) {
        let [r, c] = queue.pop();

        for (let i = 0; i < 4; i++) {
            let [dr, dc] = directions[i];
            let nr = r + dr;
            let nc = c + dc;

            //방안에있고, 방문 안했고, 장애물아닌경우 ㅇㅇ
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
                visited[i] = true; //fixed
                const nextDistance = distance[currentPos][i + 1];
                //유효한 경로 ..
                if (nextDistance !== Infinity) {
                    dfs(i + 1, currentDistance + nextDistance, depth + 1);
                }

                visited[i] = false; // 탐색이끝나면 방문기록 되돌아감 /백트래킹
            }
        }
    }

    dfs(startPos, 0, 0);
    //더러운칸 사이의 거리구하기

    // for (let i = 0; i < permus.length; i++) {
    //     const perm = permus[i];
    //     let currentPos = startPos;
    //     let currentDistance = 0;
    //     let validPath = true;
    //     for (let j = 0; j < perm.length; j++) {
    //         const nextIdx = perm[j];

    //         const distanceToNext = distance[currentPos][nextIdx];
    //         if (distanceToNext === Infinity) {
    //             //도달할 수 없는 칸이 있는거라서 무효
    //             validPath = false;
    //             break; //해당 순열무효
    //         }
    //         currentDistance += distanceToNext;
    //         currentPos = nextIdx;
    //     }
    //     //다 갈수있는 경로라면 최단거리인지 검사
    //     if (validPath) {
    //         minDistance = Math.min(minDistance, currentDistance);
    //     }
    // }

    return minDistance === Infinity ? -1 : minDistance;
}

//상하좌우
const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];
while (w !== 0 && h !== 0) {
    let map = [];
    const dusts = [];
    const queue = [];
    let start_r = 0;
    let start_c = 0;
    //맵받아오기
    for (let i = 0; i < h; i++) {
        map.push(input[index++].trim().split(""));
    }

    //시작점찾기

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
    const n = dusts.length; //더러운 칸의 개수
    const position = [[start_r, start_c], ...dusts];
    const distances = Array.from({ length: n + 1 }, (_) =>
        Array(n + 1).fill(Infinity)
    ); //2차원배열
    const visited = bfs(start_r, start_c, map, w, h);
    let validPath = true;

    //각 위치에서 다른 위치까지의 최단 거리를 계산합시다.
    //dist[i][j] 는 positions[i]위치에서 positions[j]까지의 거리입니다~
    for (let i = 0; i <= n; i++) {
        const bfsResult = bfs(position[i][0], position[i][1], map, w, h);

        for (let j = 0; j <= n; j++) {
            const distance = bfsResult[position[j][0]][position[j][1]];

            if (distance === -1) {
                validPath = false; // 갈 수 없는 더러운 칸이 존재하는 경우
            }
            distances[i][j] = bfsResult[position[j][0]][position[j][1]];
        }
    }

    // 더러운 칸을 방문하는 최단 경로 계산
    if (!validPath) {
        console.log(-1); // 더러운 칸에 갈 수 없는 경우
    } else {
        const dirtyIndexes = Array.from({ length: n }, (_, i) => i + 1);
        console.log(calculateMinDistance(0, dirtyIndexes, distances)); // 시작점은 0
    }

    //다음 test
    [w, h] = input[index++].trim().split(" ").map(Number);
}
