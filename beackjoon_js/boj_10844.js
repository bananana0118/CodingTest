let fs = require('fs');
const N = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .trim()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution() {
  const n = parseInt(N[0]);
  const dp = Array.from(Array(n + 1), () => new Array(10).fill(0));
  dp[1] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  let answer = 0;
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < 10; j++) {
      if (j === 0) {
        dp[i][0] = dp[i - 1][1] % 1000000000;
      } else if (j === 9) {
        dp[i][9] = dp[i - 1][8] % 1000000000;
      } else {
        dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j + 1]) % 1000000000;
      }
    }
  }
  answer = dp[n].reduce((a, b) => a + b, 0);
  console.log(answer % 1000000000);
}

solution();
