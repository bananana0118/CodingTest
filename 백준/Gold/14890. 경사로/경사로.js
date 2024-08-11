const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./example.txt")
    .toString()
    .trim()
    .split("\n")
    .map((item) => item.trim());

//배열만들고
//배열받기

const [info, ...myMap] = input;

const [N, L] = info.split(" ").map(Number);
//2차원 배열

const matrix = [];

for (let i = 0; i < N; i++) {
    matrix.push([...myMap[i].split(" ").map(Number)]);
}
function solution(N, L, map) {
    function canPass(path) {
        const used = new Array(N).fill(false);
        for (let i = 0; i < N - 1; i++) {
            if (path[i] === path[i + 1]) continue;
            if (Math.abs(path[i] - path[i + 1]) > 1) return false;

            if (path[i] < path[i + 1]) { // 오르막 경사로
                for (let j = i; j > i - L; j--) {
                    if (j < 0 || path[j] !== path[i] || used[j]) return false; // *오르막 검사 로직 변경*
                    used[j] = true; // *경사로 중복 설치 방지*
                }
            } else { // 내리막 경사로
                for (let j = i + 1; j <= i + L; j++) {
                    if (j >= N || path[j] !== path[i + 1] || used[j]) return false; // *내리막 검사 로직 변경*
                    used[j] = true; // *경사로 중복 설치 방지*
                }
                i += L - 1; // *내리막 경사로 설치 후, 인덱스 조정*
            }
        }
        return true;
    }

    let count = 0;
    for (let i = 0; i < N; i++) {
        const row = [], col = [];
        for (let j = 0; j < N; j++) {
            row.push(map[i][j]);
            col.push(map[j][i]);
        }
        if (canPass(row)) count++;
        if (canPass(col)) count++;
    }
    return count;
}

// 입력 예시


console.log(solution(N, L, matrix));  // 예상되는 결과 출력


