const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
let input = require('fs').readFileSync(filePath).toString().trim().split('\n');
let index = 0;

//입력받고
const [N, r, c] = input[index++].split(' ').map(Number);
let count = 0;
const solution = () => {
  //N개의 판을 생성
  const n = 2 ** N;

  quad(n, 0, 0);
  //z를 그리는 함수

  function quad(size, i, j) {
    if (i == r && j == c) {
      console.log(count);
      return;
    }

    if (size === 1) {
      count += 1;
      return;
    }

    //x와 y가 해당사분면이 아니면,count값 증가
    if (!(i <= r && r < i + size && j <= c && c < j + size)) {
      count += size * size;
      return;
    }

    quad(size / 2, i, j); //1사분면
    quad(size / 2, i, j + size / 2); //2사분면
    quad(size / 2, i + size / 2, j);
    quad(size / 2, i + size / 2, j + size / 2);
  }

  //4등분하는 함수
  //count를 올리는 함수
};
solution();
