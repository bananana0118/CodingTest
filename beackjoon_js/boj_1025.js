let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .trim()
  .split('\n');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let index = 0;
function isSqrt(num) {
  let number = parseInt(Math.sqrt(parseInt(num)));
  if (number ** 2 === parseInt(num)) {
    return number ** 2;
  }
  return false;
}

function solution() {
  const [N, M] = input[index++].split(' ').map(Number);
  const arr = Array.from({ length: N }, () => []);

  for (let i = 0; i < N; i++) {
    arr[i] = input[index++].split('').map(Number);
  }
  let answer = -1;

  //for문 계속쓰는걸 두려워 하지 말라
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      for (let a = -N; a < N; a++) {
        for (let b = -M; b < M; b++) {
          num = '';
          let [y, x] = [i, j];
          while (0 <= y && y < N && 0 <= x && x < M) {
            num += arr[y][x];
            //공차가 모두 0일떄는 값을 추가 또는 제거하지 않음
            //혹여 i[0]j[0] 일때의 인덱스는 다음 공차1에서 점검되므로 걱정 x를
            //공차가 0인경우를 계산하면 무한루프에 빠진다.
            if (a === 0 && b === 0) break;
            let value = isSqrt(num);
            if (value !== false) {
              answer = Math.max(answer, value);
            }
            y += a; //등차더함
            x += b; //등차더함
          }
        }
      }
    }
  }
  console.log(answer);
}
solution();
