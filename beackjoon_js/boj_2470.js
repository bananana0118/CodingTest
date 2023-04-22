let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .trim()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution(input) {
  const n = parseInt(input[0]);
  const arr = input[1].split(' ').map(Number);

  let left = 0;
  let right = arr.length - 1;
  let answer = [arr[left], arr[right]];
  arr.sort((a, b) => a - b);

  let result = Infinity;
  while (left < right) {
    const temp = arr[left] + arr[right];
    if (Math.abs(temp) <= Math.abs(result)) {
      answer = [arr[left], arr[right]];
      result = temp;
    }
    if (temp === 0) break;
    else if (temp < 0) {
      left += 1;
    } else if (temp > 0) {
      right -= 1;
    }
  }

  console.log(answer.join(' '));
}

solution(input);
