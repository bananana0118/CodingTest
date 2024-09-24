const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

let index = 0;

//동 서 남 북
const South = [
    //1,2,3,4,5,6 //남
    [1, 1],
    [2, 1],
    [3, 1],
    [0, 1],
    [1, 0],
    [1, 2],
];

const North = [
    //북
    [3, 1],
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 0],
    [1, 2],
];
const East = [
    [0, 1],
    [1, 2],
    [2, 1],
    [1, 0],
    [1, 1],
    [3, 1],
];
const West = [
    //서
    [0, 1],
    [1, 0],
    [2, 1],
    [1, 2],
    [3, 1],
    [1, 1],
];

let dice = Array.from({ length: 4 }, (_) => new Array(3).fill(0));
//주사위 움직이기
function rolling(current, order) {
    let newDice = current.map((v) => [...v]);

    let directions = [];
    //동 서 북 남

    switch (order) {
        case 1:
            directions = East;
            break;
        case 2:
            directions = West;
            break;
        case 3:
            directions = North;
            break;
        case 4:
            directions = South;
            break;
    }

    // console.log("aaaaaaaaaaaaaaaaaaaaa");
    // console.log(current);

    newDice[directions[0][0]][directions[0][1]] = current[0][1];
    newDice[directions[1][0]][directions[1][1]] = current[1][1];
    newDice[directions[2][0]][directions[2][1]] = current[2][1];
    newDice[directions[3][0]][directions[3][1]] = current[3][1];
    newDice[directions[4][0]][directions[4][1]] = current[1][0];
    newDice[directions[5][0]][directions[5][1]] = current[1][2];
    // console.log("bbbbbbbbbbbbbbbbbbbbbbbb");

    // console.log(newDice);

    // console.log("ccccccccccccccccccccccc");

    return newDice;
}

//동서북남
const directions = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
];

//r,c
const [N, M, start_r, start_c, orderlen] = input[index++]
    .trim()
    .split(" ")
    .map(Number);

//주사위 이동하기
function diceMove(r, c, map, order) {
    //nr,nc
    const [dr, dc] = directions[order - 1];
    const nr = dr + r;
    const nc = dc + c;
    if (nr < 0 || nr >= N || nc < 0 || nc >= M) return [-1, -1];

    return [nr, nc];
}

//발판 흡수하기
//발판내뿜기

function solution() {
    const map = [];
    //맵설정
    for (let i = 0; i < N; i++) {
        map.push(input[index++].trim().split(" ").map(Number));
    }

    const orders = input[index++].trim().split(" ").map(Number);
    let [r, c] = [start_r, start_c];

    //솔루션
    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        //주사위를 이동시킬 수 있는가 ?
        let [nr, nc] = diceMove(r, c, map, order);

        if (nr === -1 && nc === -1) {
            continue;
        } // 이동불가 => 출력하지 않음
        dice = rolling(dice, order);
        console.log(dice[1][1]);
        //주사위 바닥면dice[3][1]
        //주사위 윗면  dice[1][1]

        const bottomNum = map[nr][nc];
        //이동한 칸에 쓰여있는 수가 0 이면
        //=> 주사위의 바닥면에 쓰여있는 수가 칸에 복사
        if (bottomNum === 0) {
            const num = dice[3][1];
            map[nr][nc] = num;
        } else {
            //이동칸에 쓰여있는 수가 0이 아니면 =>
            //칸에 숫자=> 주사위로 => 칸은 0으로

            dice[3][1] = bottomNum;
            map[nr][nc] = 0;
        }
        //주사위 이동

        [r, c] = [nr, nc];
    }
}

solution();
