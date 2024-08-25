const inputFile = process.platform === 'linux'? '/dev/stdin' : './example.txt';
const input = require('fs').readFileSync(inputFile).toString().trim().split('\n');
const [N, M, K] = input[0].split(' ').map(Number);
const A = input.slice(1, N + 1).map(line => line.split(' ').map(Number));
const operations = input.slice(N + 1).map(line => line.split(' ').map(Number));

// 배열을 돌리는 함수를 만든다
function rotate(arr, r, c, s) {
    const copy = arr.map(row => row.slice());
    for (let layer = 1; layer <= s; layer++) {
        const top = r - layer - 1; //인덱스 때문에 -1 해줌
        const bottom = r + layer - 1;
        const left = c - layer - 1;
        const right = c + layer - 1;

        for (let i = left; i < right; i++) copy[top][i + 1] = arr[top][i];
        for (let i = top; i < bottom; i++) copy[i + 1][right] = arr[i][right];
        for (let i = right; i > left; i--) copy[bottom][i - 1] = arr[bottom][i];
        for (let i = bottom; i > top; i--) copy[i - 1][left] = arr[i][left];
    }
    return copy;
}

// 모든 순서를 시도해보는 함수를 만든다
function getPermutations(arr, result, used, depth, res) {
    if (depth === arr.length) {
        res.push(result.slice());
        return;
    }

    for (let i = 0; i < arr.length; i++) {
        if (!used[i]) {
            used[i] = true;
            result.push(arr[i]);
            getPermutations(arr, result, used, depth + 1, res);
            result.pop();
            used[i] = false;
        }
    }
}

// 가능한 모든 순서를 저장
const permutations = [];
getPermutations(operations, [], Array(K).fill(false), 0, permutations);

let minValue = Infinity;

// 각 순서에 대해 배열을 돌려보고 최솟값을 찾음
permutations.forEach(order => {
    let tempArr = A.map(row => row.slice());
    order.forEach(([r, c, s]) => {
        tempArr = rotate(tempArr, r, c, s);
    });
    minValue = Math.min(minValue, Math.min(...tempArr.map(row => row.reduce((a, b) => a + b))));
});

console.log(minValue);