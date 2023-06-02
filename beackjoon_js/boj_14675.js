let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');

// const input = fs.readFileSync('/dev/stdin').toString().split('\n');
let index = 0;

function solution() {
  //초기화
  const N = parseInt(input[index++]);
  const graph = Array.from(new Array(N + 1), () => 0);

  for (let i = 0; i < N - 1; i++) {
    const [a, b] = input[index++].split(' ').map(Number);
    graph[a] += 1;
    graph[b] += 1;
  }

  console.log(graph);
  const M = parseInt(input[index++]);

  let count = 0;
  let answer = [];
  while (count < M) {
    const [t, q] = input[index++].split(' ').map(Number);

    if (t === 1) {
      if (graph[q] >= 2) answer.push('yes');
      else {
        answer.push('no');
      }
    } else {
      answer.push('yes');
    }
    count++;
  }
  console.log(answer.join('\n'));
}
solution();
