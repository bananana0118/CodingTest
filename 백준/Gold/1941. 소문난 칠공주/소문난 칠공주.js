const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./example.txt")
    .toString()
    .trim()
    .split("\n")
    .map((item) => item.trim());

// Input parsing
const board = input.map(row => row.split(""));

// Directions for moving in 4-connected grid
const directions = [
    [-1, 0], // Up
    [1, 0],  // Down
    [0, -1], // Left
    [0, 1]   // Right
];

// Function to check if all positions are connected
const isConnected = (positions) => {
    const visited = Array.from({ length: 5 }, () => new Array(5).fill(false));
    const queue = [positions[0]];
    visited[positions[0][0]][positions[0][1]] = true;
    let count = 1;

    while (queue.length) {
        const [y, x] = queue.shift();

        for (const [dy, dx] of directions) {
            const [ny, nx] = [y + dy, x + dx];
            if (0 <= ny && ny < 5 && 0 <= nx && nx < 5 && !visited[ny][nx] &&
                positions.some(([py, px]) => py === ny && px === nx)) {
                visited[ny][nx] = true;
                queue.push([ny, nx]);
                count++;
            }
        }
    }
    return count === 7;
};

// Function to check if there are at least 4 'S' students
const isPrincess = (team) => {
    let countS = 0;
    for (const [i, j] of team) {
        if (board[i][j] === "S") countS++;
    }
    return countS >= 4;
};

// Function to generate all combinations of 7 positions
const generateCombinations = (positions, k) => {
    const results = [];
    const combination = Array(k).fill(0);

    const generate = (start, depth) => {
        if (depth === k) {
            results.push(combination.slice());
            return;
        }
        for (let i = start; i < positions.length; i++) {
            combination[depth] = positions[i];
            generate(i + 1, depth + 1);
        }
    };

    generate(0, 0);
    return results;
};

// Collect all possible positions
const allPositions = [];
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        allPositions.push([i, j]);
    }
}

// Main calculation
let total = 0;
const combinations = generateCombinations(allPositions, 7);

for (const team of combinations) {
    if (isPrincess(team) && isConnected(team)) {
        total++;
    }
}

console.log(total);
