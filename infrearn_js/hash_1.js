let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '\\example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');
let index = 0;
function solution() {
  const n = parseInt(input[index++]);
  const votes = input[index++].split('');
  const candidates = {};
  let answer = 0;
  let max = 0;
  for (let i = 0; i < n; i++) {
    candidates[votes[i]] = (candidates[votes[i]] ?? 0) + 1;
  }

  for (const [key, value] of Object.entries(candidates)) {
    if (value > max) {
      max = value;
      answer = key;
    }
  }
  console.log(answer);
}

solution();
