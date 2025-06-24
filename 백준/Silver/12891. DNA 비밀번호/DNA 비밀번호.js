const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

//임의의 문자열 만들고 거기서 문자열을 뽑는다.
//조건을 주는데 조건을 만족하는 임의의 비밀번호 수
//map을 이용해서 n(1)로 조건을 검사하자.

const [S, P] = input[0].split(" ").map(Number);
const arr = input[1].split("");
const [A, C, G, T] = input[2].split(" ").map(Number);
function isComplete(map, conditions) {
    if (
        map.get("A") <= conditions.get("A") &&
        map.get("C") <= conditions.get("C") &&
        map.get("G") <= conditions.get("G") &&
        map.get("T") <= conditions.get("T")
    ) {
        return true;
    }
    return false;
}

const map = new Map();
const conditions = new Map();

map.set("A", A);
map.set("C", C);
map.set("G", G);
map.set("T", T);

conditions.set("A", 0);
conditions.set("C", 0);
conditions.set("G", 0);
conditions.set("T", 0);

//윈도우 초기화
for (let i = 0; i < P; i++) {
    conditions.set(arr[i], conditions.get(arr[i]) + 1);
}

let answer = 0;

answer += isComplete(map, conditions) ? 1 : 0;
//갱신

for (let i = 1; i + P - 1 < S; i++) {
    const key = arr[i + P - 1];
    const preKey = arr[i - 1];
    if (conditions.get(key)) {
        conditions.set(key, conditions.get(key) + 1);
    } else {
        conditions.set(key, 1);
    }
    conditions.set(
        preKey,
        conditions.get(preKey) == 0 ? 0 : conditions.get(preKey) - 1
    );

    answer += isComplete(map, conditions) ? 1 : 0;
}
console.log(answer);
