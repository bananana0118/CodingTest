let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .trim()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');
let index = 0;
function solution() {
  const n = parseInt(input[index++]);
  const timeTable = [];
  for (let i = 0; i < n; i++) {
    timeTable.push(input[index++].split(' ').map(Number));
  }
  let idx = 1;
  //끝나는 시간 기준으로 정렬
  timeTable.sort((a, b) => a[1] - b[1]);
  const rooms = [];
  rooms.push(timeTable[0][1]);

  //1.초반에는 룸 하나로 진행
  //2. 새로운 값 입력시
  //2-1.룸에 들어갈 수 없으면 룸 추가로 넣음 (push)
  //3.룸에 들어갈 수 있으면 해당값을 교체함
  //마지막 룸 배열의 길이를 출력
  while (idx < n) {
    //룸에 들어갈 수 있는지 탐색
    const [startTime, endTime] = timeTable[idx];
    const len = rooms.length;
    let isAble = 0;
    for (let i = 0; i < len; i++) {
      if (startTime >= rooms[i]) {
        isAble = 1;
        rooms[i] = endTime;
        break;
      }
    }
    if (!isAble) {
      rooms.push(endTime);
      rooms.sort((a, b) => a - b);
    }
    idx++;
  }
  console.log(rooms.length);
}

solution();
