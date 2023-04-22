const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

const solution = () => {
  const [N, S] = input[0].split(' ').map(Number);
  const arr = input[1].split(' ').map(Number);
  let left = 0;
  let result = 0;
  count = 0;
  for (let right = 0; right < N; right += 1) {
    if (arr[right] % 2 === 1) {
      count += 1;
    }
    while (count > S) {
      if (arr[left] % 2 === 1) count -= 1;
      left += 1;
    }
    if (count <= S) result = Math.max(result, right - left - count + 1);
  }
  console.log(result);
};
solution();
