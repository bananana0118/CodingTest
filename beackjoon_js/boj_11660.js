const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

let n = 0;

const solution = () => {
  const [N, count] = input[0].split(' ').map(Number);
  const matrix = new Array(N);
  const hapMatrix = Array.from(Array(N), () => new Array(N).fill(0));

  for (let i = 0; i < N; i += 1) {
    matrix[i] = input[i + 1].split(' ').map(Number);
  }

  for (let i = 0; i < N; i += 1) {
    let sums = 0;
    for (let j = 0; j < N; j += 1) {
      sums += matrix[i][j];
      hapMatrix[i][j] = sums;
    }
  }

  input = input.slice(N + 1);
  const result = [];
  let i = 0;

  while (i < count) {
    const [x1, y1, x2, y2] = input[i].split(' ').map(Number);
    let sum = 0;
    for (let k = x1; k <= x2; k += 1) {
      let hap = 0;
      if (y1 === 1) hap += hapMatrix[k - 1][y2 - 1];
      else hap += hapMatrix[k - 1][y2 - 1] - hapMatrix[k - 1][y1 - 2];
      sum += hap;
    }
    result.push(sum);
    i += 1;
  }
  console.log(result.join('\n'));
};

solution();
