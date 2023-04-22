let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const result = [];
const N = input[0] - 0;
const mat = new Array(N);

for (let i = 0; i < N; i += 1) {
  mat[i] = input[i + 1].split('').map(Number);
}

function quad_conq(row, col, N) {
  temp_cnt = 0;

  for (let i = row; i < row + N; i += 1) {
    for (let j = col; j < col + N; j += 1) {
      if (mat[i][j] === 1) temp_cnt += 1;
    }
  }

  if (temp_cnt === 0) {
    result.push('0');
  } else if (temp_cnt === N ** 2) {
    result.push('1');
  } else {
    result.push('(');
    quad_conq(row, col, N / 2);
    quad_conq(row, col + N / 2, N / 2);
    quad_conq(row + N / 2, col, N / 2);
    quad_conq(row + N / 2, col + N / 2, N / 2);

    result.push(')');
  }
}

function solution() {
  quad_conq(0, 0, N);
  console.log(result.join(''));
}
solution();
