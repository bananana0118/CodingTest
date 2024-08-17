const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./example.txt")
    .toString()
    .trim()
    .split("\n")
    .map((item) => item.trim());

const find = (parent, x) => {
    if (parent[x] !== x) {
        parent[x] = find(parent, parent[x]);
    }

    return parent[x];
};

const union = (parent, rank, size, x, y) => {
    const rootX = find(parent, x);
    const rootY = find(parent, y);

    if (rootX !== rootY) {
        if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
            size[rootX] += size[rootY];
        } else if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
            size[rootY] += size[rootX];
        } else {
            parent[rootY] = rootX;
            size[rootX] += size[rootY];
            rank[rootX]++;
        }
    }
};

//input 받기
let idx = 0;
const n = Number(input[idx++]);
while (idx !== input.length) {
    const length = Number(input[idx++]);
    const parent = {}; //부모
    const rank = {};
    const size = {}; //구성트리의 사이즈

    for (let i = 0; i < length; i++) {
        const [friend1, friend2] = input[idx++].split(" ");

        if (!(friend1 in parent)) {
            parent[friend1] = friend1;
            rank[friend1] = 0;
            size[friend1] = 1;
        }

        if (!(friend2 in parent)) {
            parent[friend2] = friend2;
            rank[friend2] = 0;
            size[friend2] = 1;
        }

        union(parent, rank, size, friend1, friend2);
        const rootA = find(parent, friend1);
        console.log(size[rootA]);

        //연결됐는지 검사하는 로직
    }
}
