let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .trim()
  .split('\n');

//이차원 배열을 분해하는 신박한코드!
const board = input.map(elem => elem.split(' ').map(Number));
//가장 왼쪽좌표 중심이니까 차례대로 우대각, 오른쪽, 오른아래대각,아래만 살피면됨\
const dx = [-1, 0, 1, 1];
const dy = [1, 1, 1, 0];
let ans = 0;
let ansX, ansY;

function check(x, y, color) {
  //한번에 방향만큼 순회,
  for (let i = 0; i < 4; i += 1) {
    let [nx, ny] = [x + dx[i], y + dy[i]];
    let cnt = 1;

    while (true) {
      if (nx < 0 || nx >= 19 || ny < 0 || ny >= 19) break;

      //방향의 바둑돌이 내 color와 인접하지 않으면 break * 이후 바둑돌이 다른지는 여기서 검사함
      if (board[nx][ny] !== color) break;
      cnt += 1;
      //핵심, 무한반복으로 해당 방향으로 반복진행
      nx = nx + dx[i];
      ny = ny + dy[i];
    } //시작좌표에서 방향으로 뺐을때의 값이, 범위내에 존재하고 color가 달라야 인정해줌
    if (cnt === 5) {
      let prevX = x - dx[i];
      let prevY = y - dy[i];
      if (0 <= prevX && prevX < 19 && 0 <= prevY && prevY < 19) {
        if (board[prevX][prevY] === color) {
          continue; //color가 똑같으면 다시 반복을 순회함
        }
      }
      ans = color;
      ansX = x;
      ansY = y;
      return;
    }
  }
  return;
}

function solution(input) {
  for (let i = 0; i < 19; i += 1) {
    for (let j = 0; j < 19; j += 1) {
      if (board[i][j] === 0) continue;
      check(i, j, board[i][j]);
    }
  }

  if (ans === 0) console.log(0);
  else {
    console.log(ans);
    console.log(`${ansX + 1} ${ansY + 1}`);
  }
}

solution(input);
