//the maximum safe integer in JavaScript (2^53 – 1).
const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
let input = require('fs').readFileSync(filePath).toString().trim().split('\n');
let index = 0;

const [N, K] = input[index].split(' ');
const k = BigInt(K);
const n = Number;
const solution = () => {
  let result = 'NO';
  let start = 0;
  let end = Math.floor(n / 2);

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    const papers = BigInt(mid + 1) * BigInt(n - mid + 1);
    if (papers === k) {
      result = 'YES';
      break;
    } else if (papers < k) {
      start = mid + 1;
    } else if (papers > k) {
      end = mid - 1;
    }
  }
  console.log(result);
};

solution();
