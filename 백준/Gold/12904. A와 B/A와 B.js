const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

let index = 0;

const S = input[index++].trim();
const T = input[index].trim();

//문자열 뒤에 A추가 => 문자열 뒤의 A제거
function method1(S) {
    const newS = [...S];
    newS.pop();
    return newS;
}

//문자열 뒤집고 B추가 = B제거후 문자열 뒤집음
function method2(S) {
    const newS = [...S];
    newS.pop();
    newS.reverse();
    return newS;
}

let result = 0;

function makeT(str) {
    while (str.length !== S.length) {
        if (str[str.length - 1] === "A") {
            str = method1(str);
        } else {
            str = method2(str);
        }
    }

    if (str.join("") === S) result = 1;
}
makeT(T.split(""));
console.log(result);
