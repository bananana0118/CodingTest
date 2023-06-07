const fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');
let index = 0;

const solution = () => {
  //가장 작은값과 가장 큰 값의 차이는 그 사이 수의 차들의 합
  const [N, K] = input[index++].split(' ').map(Number);
  const arr = input[index++].split(' ').map(Number);

  const diff = [];
  let answer = 0;

  for (let i = 0; i < N - 1; i++) {
    diff.push(arr[i + 1] - arr[i]);
  }

  diff.sort((a, b) => a - b);
  //원하는 그룹이 k 개면 그룹의 경계는 K-1만큼 존재함
  for (let i = 0; i < diff.length - (K - 1); i++) {
    answer += diff[i];
  }

  console.log(answer);

  //k조로 나눈다.=> 그 차가 제일 큰 구간을 더하지 않는다.
};
solution();
