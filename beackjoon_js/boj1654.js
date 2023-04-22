let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution(input) {
  const [k, n] = input[0].split(' ');
  const arr = [];

  function BSearch(array, target) {
    let low = 1;
    let high = Math.max(...array);
    let mid = 0;
    let t = 0;

    while (low < high) {
      t = 0;
      mid = parseInt((low + high) / 2) + 1;
      arr.forEach(num => {
        t += parseInt(num / mid);
      });

      if (t >= target) {
        low = mid;
      } else {
        high = mid - 1;
      }
    }
    return high;
  }

  for (let i = 1; i <= k; i += 1) {
    arr.push(parseInt(input[i]));
  }

  let answer = BSearch(arr, n);

  console.log(`${answer}`);
}
solution(input);
