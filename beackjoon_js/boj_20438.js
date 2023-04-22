let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution(input) {
  const [N, K, Q, M] = input[0].split(' ').map(Number);
  input.shift();
  const sleep = input[0].split(' ').map(Number);
  input.shift();
  const startCodes = input[0].split(' ').map(Number);
  input.shift();
  const student = new Array(N + 3).fill(0);
  //누적합 만들기
  startCodes.forEach(e => (student[e] = 1));
  sleep.forEach(e => (student[e] = -1));
  const arr = new Array(N + 3).fill(0);
  startCodes.forEach(i => {
    let k = 1;
    if (student[i] !== -1) {
      while (i * k < N + 3) {
        if (student[i * k] !== -1) {
          student[i * k] = 1;
        }
        k += 1;
      }
    }
  });

  for (let i = 3; i < N + 3; i += 1) {
    let t = student[i];
    if (student[i] === -1) t = 0;
    arr[i] = arr[i - 1] + t;
  }

  const result = [];
  for (let i = 0; i < M; i += 1) {
    //조건으로 들어올 구간
    const [start, end] = input[i].split(' ').map(Number);
    //해당 값 까지 포함시켜야 하니까 -1
    result.push(end - start + 1 - (arr[end] - arr[start - 1]));
  }
  console.log(result.join('\n'));
}
solution(input);
