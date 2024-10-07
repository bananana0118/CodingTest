const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs").readFileSync(inputFile).toString().trim().split("\n");

const N = Number(input[0]);
const S = input.slice(1).map(line => line.split(" ").map(Number));

let minDifference = Number.MAX_SAFE_INTEGER;

// 백트래킹을 위한 visited 배열
const visited = Array(N).fill(false);

// 능력치 계산 함수
function calculateDifference() {
    let startTeam = [];
    let linkTeam = [];

    for (let i = 0; i < N; i++) {
        if (visited[i]) startTeam.push(i);
        else linkTeam.push(i);
    }

    let startSum = 0;
    let linkSum = 0;

    // 스타트 팀 능력치 계산
    for (let i = 0; i < startTeam.length; i++) {
        for (let j = i + 1; j < startTeam.length; j++) {
            startSum += S[startTeam[i]][startTeam[j]] + S[startTeam[j]][startTeam[i]];
        }
    }

    // 링크 팀 능력치 계산
    for (let i = 0; i < linkTeam.length; i++) {
        for (let j = i + 1; j < linkTeam.length; j++) {
            linkSum += S[linkTeam[i]][linkTeam[j]] + S[linkTeam[j]][linkTeam[i]];
        }
    }

    // 두 팀의 능력치 차이
    return Math.abs(startSum - linkSum);
}

// 백트래킹 함수
function backtrack(depth, index) {
    if (depth === N / 2) {
        // 팀이 나뉘면 능력치 차이 계산
        const diff = calculateDifference();
        minDifference = Math.min(minDifference, diff);
        return;
    }

    for (let i = index; i < N; i++) {
        if (!visited[i]) {
            visited[i] = true;
            backtrack(depth + 1, i + 1);
            visited[i] = false;
        }
    }
}

// 백트래킹 시작
backtrack(0, 0);

// 결과 출력
console.log(minDifference);
