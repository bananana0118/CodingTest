const inputFile = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = require("fs")
    .readFileSync(inputFile)
    .toString()
    .trim()
    .split("\n");

class Unionfind {
    constructor(size) {
        this.parent = Array.from({ length: size }, (_, i) => i);
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX !== rootY) {
            this.parent[rootX] = rootY;
        }
    }

    find(x) {
        if (this.parent[x] === x) {
            return x;
        }
        return (this.parent[x] = this.find(this.parent[x]));
    }
}

let index = 0;

const [N, M] = input[index++].trim().split(" ").map(Number);
const [numOftruePerson, ...person] = input[index++]
    .trim()
    .split(" ")
    .map(Number);
const unionFind = new Unionfind(N + 1);
let totalCount = M;

const parties = [];

function solution() {
    //union
    for (let i = 1; i < person.length; i++) {
        unionFind.union(person[0], person[i]);
    }

    //광란의 파티
    for (let i = 0; i < M; i++) {
        let isTrueMember = 0;
        const [totalNum, ...humans] = input[index++]
            .trim()
            .split(" ")
            .map(Number);
        parties.push(humans);

        //진실멤버 검출
        for (let j = 0; j < humans.length; j++) {
            for (let k = 0; k < numOftruePerson; k++) {
                //진실멤이 있을때
                if (humans[j] === person[k]) {
                    isTrueMember = person[k];
                    break;
                }
                //진실멤이 없을때, 들은적 있는지 검사
                else {
                    unionFind.union(humans[0], humans[j]);
                }
            }
            if (isTrueMember !== 0) break;
        }

        //진실멤이 있으면 모두 유니온
        if (isTrueMember) {
            for (let j = 0; j < humans.length; j++) {
                unionFind.union(isTrueMember, humans[j]);
            }
        }
    }

    //파티진행

    for (let i = 0; i < M; i++) {
        const trueX = unionFind.find(person[0]);
        const members = parties[i];

        for (let j = 0; j < members.length; j++) {
            if (trueX === unionFind.find(members[j])) {
                totalCount--;
                break;
            }
        }
    }

    return totalCount;
}

numOftruePerson === 0 ? console.log(M) : console.log(solution());
