let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution(input) {
  const N = input[0];
  const arr = input[1].split(' ').map(Number);

  const dp = [...arr];
  for (let i = 0; i < N; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (arr[j] < arr[i] && dp[i] < dp[j] + arr[i]) {
        //현재의 arr[i]가 이전의 arr[j]보다 클떄.
        dp[i] = dp[j] + arr[i];
      }
    }
  }

  //구한 수열중 가장 큰 합.
  console.log(Math.max(...dp));
}
solution(input);
