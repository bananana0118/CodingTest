const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'example.txt')
  .toString()
  .trim()
  .split('\n');
const [N, M] = input[0].split(' ').map(Number);
const arr = input
  .slice(1)
  .map(Number)
  .sort((a, b) => a - b);

function solution(n, m, arr) {
  let left = 0;
  //모든사람이 심사를 받는데 걸리는 최대값, 정렬되어있기때문에 마지막이 가장 오래걸림
  let right = m * arr[arr.length - 1];
  let answer = 0;

  if (n === 1) return m * arr[0]; //심사대가 하나일 경우

  while (left <= right) {
    //
    let mid = Math.floor((left + right) / 2);
    //mid 시간동안 몇명 검사할 수 있는지, 총인원을 구함,
    let count = arr.reduce((acc, cur) => acc + parseInt(mid / cur), 0);

    //원하는 사람 이 나올때까지 값을 증가시키고 감소시킴

    if (count >= m) {
      right = mid - 1;
    } else {
      //1올린값이 가장 가능성 높으므로 최솟값이다~ 하고 저장해줌
      left = mid + 1;
      answer = left;
    }
  }

  return answer;
}

console.log(solution(N, M, arr));
