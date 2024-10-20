const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

let index = 0;

const N = Number(input[index++].trim());
const P = input[index++].trim().split(" ").map(Number);
const S = input[index++].trim().split(" ").map(Number);
const cards = Array.from({ length: N }, (_, i) => i);
const initial = [...cards];
// 정답 체크
function checkAnswer(cards) {
    for (let i = 0; i < N; i++) {
        if (P[i] !== cards[i] % 3) return false;
    }
    return true;
}

function mix(cards, S) {
    const temp = [...cards];

    for (let i = 0; i < N; i++) {
        cards[i] = temp[S[i]];
    }
}

function Suffle() {
    let count = 0;

    if (checkAnswer(cards)) return 0;
    while (true) {
        let isDefault = false;
        mix(cards, S);
        count += 1;
        if (checkAnswer(cards)) return count;
        for (let i = 0; i < initial.length; i++) {
            if (initial[i] === cards[i]) isDefault = true;
            else {
                isDefault = false;
                break;
            }
        }
        if (isDefault) return -1;
    }
}

console.log(Suffle());
