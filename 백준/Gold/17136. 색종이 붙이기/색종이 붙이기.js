const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(filePath)
    .toString()
    .trim()
    .split("\n");

let board = [];
const paper = [0,5, 5, 5, 5, 5];
for (let i = 0; i < input.length; i++) {
    board.push(input[i].split(" ").map(Number));
}
let minCount = Infinity;

const fill = (x, y, size, state) => {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            board[x + i][y + j] = state;
        }
    }
};
const checkPaper = (y, x, size) => {
    if (y + size > 10 || x + size > 10) return false;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i + y][j + x] !== 1) {
                return false;
            }
        }
    }
    return true;
};

const solution = (x, y, count) => {
    if (y === 10) {
        x++;
        y = 0;
    }
    if (x === 10) {
        minCount = Math.min(minCount, count);
        return;
    }
    if (board[x][y] === 1) {
        for (let size = 5; size > 0; size--) {
            if (paper[size] > 0 && checkPaper(x, y, size)) {
                paper[size]--;
                fill(x, y, size, 0);
                solution(x, y + size, count + 1);
                fill(x, y, size, 1);
                paper[size]++;
            }
        }
    } else {
        solution(x, y + 1, count);
    }
};

solution(0, 0, 0);
console.log(minCount === Infinity ? -1 : minCount);
