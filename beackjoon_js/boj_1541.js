const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().split("\n")
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .replace(/\r/g, '')
  .split('\n');
function solution(input) {
  const plusMinus = [];

  //-뒤에서 괄호치는게 최소를 만드는 수
  [...input[0]].filter(num => {
    if (num === '+' || num === '-') plusMinus.push(num);
  });
  console.log(plusMinus);
  const numbers = input[0].split('-').join('+').split('+').map(Number);
  let min = 100000;
  let value = numbers[0];
  numbers.shift();
  let border = 0;
  let i = 0;
  while (i < numbers.length) {
    if (plusMinus[i] === '+') {
      value += numbers[i];
      i += 1;
    } else if (plusMinus[i] === '-') {
      border += numbers[i];
      i += 1;
      while (plusMinus[i] !== '-' && i < numbers.length) {
        border += numbers[i];
        i += 1;
        console.log(`border ${i} ` + border);
      }
      value -= border;
      border = 0;
    }
  }

  console.log(value);
}
solution(input);
