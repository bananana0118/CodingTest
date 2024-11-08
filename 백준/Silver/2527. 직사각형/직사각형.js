const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

function findC(firstBox, secondBox) {
    const [x, y, p, q] = firstBox;
    const [x2, y2, p2, q2] = secondBox;
    return (
        (x === p2 && y === q2) ||
        (x === p2 && q === y2) ||
        (p === x2 && y === q2) ||
        (p === x2 && q === y2)
    );
}

function findB(firstBox, secondBox) {
    const [x, y, p, q] = firstBox;
    const [x2, y2, p2, q2] = secondBox;

    return (
        (x < p2 && x2 < p && (y === q2 || y2 === q)) ||
        (y < q2 && y2 < q && (x === p2 || x2 === p))
    );
}

function findD(firstBox, secondBox) {
    const [x, y, p, q] = firstBox;
    const [x2, y2, p2, q2] = secondBox;
    //x좌표가 더 크다.
    if (
        (x < x2 && p < x2) ||
        (x2 < x && p2 < x) ||
        (y < y2 && q < y2) ||
        (y2 < y && q2 < y)
    ) {
        return true;
    }
    return false;
}

for (let i = 0; i < 4; i++) {
    const pos = input[i].trim().split(" ").map(Number);
    const firstBox = [pos[0], pos[1], pos[2], pos[3]];
    const secondBox = [pos[4], pos[5], pos[6], pos[7]];

    const [x, y, p, q] = firstBox;
    const [x2, y2, p2, q2] = secondBox;

    //c찾기

    if (findD(firstBox, secondBox)) console.log("d");
    else if (findC(firstBox, secondBox)) console.log("c");
    else if (findB(firstBox, secondBox)) console.log("b");
    else console.log("a");
}
