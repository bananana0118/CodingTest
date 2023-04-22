let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution(input) {
  const n = input.shift() - 0;
  //한번에 이차원 배열 만드는 법
  const tree = Array.from(Array(n + 1), () => []);
  const check = new Array(n + 1).fill(0);
  const values = input.map(e => e.split(' ').map(Number));

  for (let i = 0; i < n - 1; i += 1) {
    const [from, to] = values[i];
    tree[from].push(to);
    tree[to].push(from);
  }

  const q = [];
  check[1] = 1;

  //첫번쨰 루프
  for (let next of tree[1]) {
    check[next] = 1;
    q.push(next);
  }

  while (q.length !== 0) {
    const curr = q.shift();
    for (let next of tree[curr]) {
      if (!check[next]) {
        check[next] = curr;
        q.push(next); //다음에 돌아야 될 값 넣어줌
      }
    }
  }
  console.log(check.slice(2).join('\n'));
}
solution(input);
