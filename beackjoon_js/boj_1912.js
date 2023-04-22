let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution(input) {
  const n = input.shift() - 0;
  const numArr = input[0].split(' ').map(Number);
  let maxSum = Math.max(...numArr);
  let sums = [];
  let temp = 0;

  for (let i = 0; i < n; i += 1) {
    temp += numArr[i];
    sums.push(temp);
    if (temp > maxSum) {
      maxSum = temp;
    }
  }
  maxDp(numArr);

  function maxDp(arr) {
    for (let j = 1; j < n; j += 1) {
      //직전까지의 합 + 자신 과 썡자신 중 더 큰걸 자신으로 삼음. => 최적의 루트 발견
      arr[j] = Math.max(arr[j], arr[j] + arr[j - 1]);

      if (arr[j] > maxSum) {
        maxSum = Math.max(arr[j], maxSum);
      }
    }
  }
  console.log(maxSum);
}
solution(input);
