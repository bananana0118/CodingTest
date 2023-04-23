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
  const sH1 = new Map();
  for (const s of str1) {
    if (sH1.has(s)) {
      sH1.set(s, sH1.get(s) + 1);
    } else {
      sH1.set(s, 1);
    }
  }

  for (const s of str2) {
    if (!sH1.has(s) || sH1.get(s) === 0) {
      answer = 'NO';
      return;
    } else {
      sH1.set(s, sH1.get(s) - 1);
    }
  }

  console.log(answer);
}

solution();
