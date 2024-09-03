const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");
function calculateDistance(x1, y1, x2, y2) {
    // 두 점 사이의 유클리드 거리 계산
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function dijkstra(start, cannons, end) {
    const n = cannons.length;
    const distances = new Array(n + 2).fill(Infinity); // 시작점, 대포들, 도착지 포함 총 (n+2)개의 노드
    distances[0] = 0; // 시작점의 거리는 0
    const pq = [[0, 0]]; // 우선순위 큐로 사용할 배열. 초기값은 [거리, 노드]

    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]); // 거리 기준으로 정렬
        const [currentDist, currentNode] = pq.shift();

        if (currentDist > distances[currentNode]) {
            continue;
        }

        // 현재 노드 좌표 설정
        let current_x, current_y;
        if (currentNode === 0) {
            [current_x, current_y] = start;
        } else if (currentNode === n + 1) {
            [current_x, current_y] = end;
        } else {
            [current_x, current_y] = cannons[currentNode - 1];
        }

        // 다른 모든 노드와의 거리 계산
        for (let nextNode = 0; nextNode < n + 2; nextNode++) {
            if (nextNode === currentNode) continue;

            let next_x, next_y;
            if (nextNode === 0) {
                [next_x, next_y] = start;
            } else if (nextNode === n + 1) {
                [next_x, next_y] = end;
            } else {
                [next_x, next_y] = cannons[nextNode - 1];
            }

            const directRunDist =
                calculateDistance(current_x, current_y, next_x, next_y) / 5.0;
            let newDist;

            if (currentNode === 0) {
                // 현재 노드가 시작점일 때
                newDist = directRunDist;
            } else {
                newDist = Math.min(
                    directRunDist,
                    2 +
                        Math.abs(
                            50 -
                                calculateDistance(
                                    current_x,
                                    current_y,
                                    next_x,
                                    next_y
                                )
                        ) /
                            5.0
                );
            }

            if (distances[currentNode] + newDist < distances[nextNode]) {
                distances[nextNode] = distances[currentNode] + newDist;
                pq.push([distances[nextNode], nextNode]);
            }
        }
    }

    return distances[n + 1];
}

// 입력 처리
const [sx, sy] = input[0].split(" ").map(Number);
const [ex, ey] = input[1].split(" ").map(Number);
const n = parseInt(input[2]);
const cannons = input.slice(3).map((line) => line.split(" ").map(Number));

// 최단 시간 계산
const result = dijkstra([sx, sy], cannons, [ex, ey]);

// 결과 출력
console.log(result.toFixed(6));
