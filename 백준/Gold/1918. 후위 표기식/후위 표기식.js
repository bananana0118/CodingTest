const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

let index = 0;

const value = input[index].trim().split("");
const operator = { "/": 2, "*": 2, "+": 1, "-": 1 };
let stack = [];
let result = "";

for (let token of value) {
    //걍 알파벳이면 걍 추가함
    if (token >= "A" && token <= "Z") {
        result += token;
    } else if (token === "(") {
        stack.push(token);
    } else if (token === ")") {
        //닫는괄호가 나오면 여는 괄호가 나올때까지 스택에 서 꺼내서 출력
        while (stack.length && stack[stack.length - 1] !== "(") {
            result += stack.pop();
        }
        stack.pop(); //여는 괄호 제거
    } else {
        //연산자가 나올떄
        //우선순위 비교, stack이 비어있지 않고 stack의 탑과 연산자 비교
        while (
            stack.length &&
            operator[stack[stack.length - 1]] >= operator[token]
        ) {
            //stack의 연산자가 현재 연산자보다 우선순위가 높으면 먼저출력
            result += stack.pop();
        }
        //그제서야 토큰연산자 추가해줌
        stack.push(token);
    }
}
while (stack.length) {
    result += stack.pop();
}
console.log(result);
