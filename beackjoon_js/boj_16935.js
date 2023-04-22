const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
let input = require('fs').readFileSync(filePath).toString().trim().split('\n');
let index = 0;
const solution = () => {
  const [N, M, R] = input[index++].split(' ').map(Number);
  let matrix = Array.from(new Array(N), () => new Array(M).fill(0));

  for (let i = 0; i < N; i += 1) {
    const arr = input[index++].split(' ').map(Number);
    for (let j = 0; j < M; j += 1) {
      matrix[i][j] = arr[j];
    }
  }

  const operations = input[index++].split(' ').map(Number);
  let count = 0;

  while (count < R) {
    switch (operations[count]) {
      case 1:
        matrix = one(matrix);
        break;
      case 2:
        matrix = two(matrix);
        break;
      case 3:
        matrix = three(matrix);
        break;
      case 4:
        matrix = four(matrix);
        break;
      case 5:
        matrix = five(matrix);
        break;
      case 6:
        matrix = six(matrix);
        break;
    }
    count += 1;
  }
  print(matrix);
};

function print(arr) {
  const answer = [];

  for (let i = 0; i < arr.length; i += 1) {
    answer.push(arr[i].join(' '));
  }
  console.log(answer.join('\n'));
  return;
}
//상하 반전
function one(arr) {
  arr = arr.reverse();
  return arr;
}

//좌우 반전
function two(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].reverse();
  }
  return arr;
}
//오른쪽으로 90
function three(arr) {
  const N = arr.length;
  const M = arr[0].length;
  let temp = Array.from(new Array(M), () => new Array(N).fill(0));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      temp[j][N - i - 1] = arr[i][j];
    }
  }
  return temp;
}
function four(arr) {
  const N = arr.length;
  const M = arr[0].length;
  let temp = Array.from(new Array(M), () => new Array(N).fill(0));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      temp[M - j - 1][i] = arr[i][j];
    }
  }
  return temp;
}

function five(arr) {
  const N = arr.length;
  const M = arr[0].length;
  const row = parseInt(N / 2);
  const col = parseInt(M / 2);
  let temp = Array.from(new Array(N), () => new Array(M).fill(0));
  //1=>2
  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < col; j += 1) {
      temp[i][col + j] = arr[i][j];
    }
  }

  //2=>3
  for (let i = 0; i < row; i += 1) {
    for (let j = col; j < M; j += 1) {
      temp[i + row][j] = arr[i][j];
    }
  }
  for (let i = row; i < N; i += 1) {
    for (let j = col; j < M; j += 1) {
      temp[i][j - col] = arr[i][j];
    }
  }
  for (let i = row; i < N; i += 1) {
    for (let j = 0; j < col; j += 1) {
      temp[i - row][j] = arr[i][j];
    }
  }

  return temp;
}

function six(arr) {
  const N = arr.length;
  const M = arr[0].length;
  const row = parseInt(N / 2);
  const col = parseInt(M / 2);
  let temp = Array.from(new Array(N), () => new Array(M).fill(0));
  //1=>4
  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < col; j += 1) {
      temp[row + i][j] = arr[i][j];
    }
  }

  //4=>3
  for (let i = row; i < N; i += 1) {
    for (let j = 0; j < col; j += 1) {
      temp[i][j + col] = arr[i][j];
    }
  }

  //3=>2
  for (let i = row; i < N; i += 1) {
    for (let j = col; j < M; j += 1) {
      temp[i - row][j] = arr[i][j];
    }
  }
  for (let i = 0; i < row; i += 1) {
    for (let j = col; j < M; j += 1) {
      temp[i][j - col] = arr[i][j];
    }
  }

  return temp;
}

solution();
