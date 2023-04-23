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
  const sH = new Map();
  let answer = 0;
  let max = 0;

  for (let x of votes) {
    if (sH.has(x)) sH.set(x, sH.get(x) + 1);
    else sH.set(x, 1);
  }

  for (const [key, value] of sH) {
    if (value > max) {
      max = value;
      answer = key;
    }
  }
  console.log(answer);
}

solution();
