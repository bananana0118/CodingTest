const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

let index = 0;

const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

let [N, M, K] = input[index++].trim().split(" ").map(Number);

const defaultLand = [];
for (let i = 0; i < N; i++) {
    defaultLand.push(input[index++].trim().split(" ").map(Number));
}

const land = Array.from({ length: N }, () => Array(N).fill(5));

// 각 칸에 있는 나무 리스트를 관리하기 위한 배열
const treeMap = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => [])
);

// 입력받은 나무 초기화
for (let i = 0; i < M; i++) {
    const [r, c, age] = input[index++].trim().split(" ").map(Number);
    treeMap[r - 1][c - 1].push(age);
}

while (K !== 0) {
    //봄
    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
            if (treeMap[r][c].length === 0) continue;

            // 봄: 나무가 양분을 먹음
            const newTrees = [];
            let deadNutrients = 0;

            treeMap[r][c].sort((a, b) => a - b);
            for (let i = 0; i < treeMap[r][c].length; i++) {
                const age = treeMap[r][c][i];
                if (land[r][c] >= age) {
                    land[r][c] -= age;
                    newTrees.push(age + 1);
                } else {
                    deadNutrients += Math.floor(age / 2);
                }
            }
            // 죽은 나무로 인한 양분 추가
            land[r][c] += deadNutrients;
            treeMap[r][c] = newTrees;
        }
    }
    //가을

    //5의 배수인 나무만 번식가능
    const newTreesToPlant = [];

    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
            treeMap[r][c].forEach((age) => {
                if (age % 5 === 0) {
                    for (let i = 0; i < directions.length; i++) {
                        const [dr, dc] = directions[i];
                        const nr = r + dr;
                        const nc = c + dc;

                        if (nr < 0 || nr > N - 1 || nc < 0 || nc > N - 1)
                            continue;
                        newTreesToPlant.push([nr, nc]);
                    }
                }
            });
        }
    }

    newTreesToPlant.forEach(([nr, nc]) => {
        treeMap[nr][nc].unshift(1);
    });
    //겨울
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            land[i][j] += defaultLand[i][j];
        }
    }
    K--;
}

// 살아남은 나무의 개수 계산
let result = 0;
for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
        result += treeMap[r][c].length;
    }
}

console.log(result);
