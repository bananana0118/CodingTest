let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '\\example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');
let index = 0;
function solution() {
  const str1 = input[index++].split('');
  const str2 = input[index++].split('');
  let answer = 'YES';
  const sH1 = {};
  for (const s of str1) {
    sH1[s] = (sH1[s] ?? 0) + 1;
  }
  for (const s of str2) {
    if (sH1[s] === undefined || sH1[s] === 0) {
      answer = 'NO';
      break;
    } else {
      sH1[s] = sH1[s] - 1;
    }
  }

  console.log(answer);
}

solution();
