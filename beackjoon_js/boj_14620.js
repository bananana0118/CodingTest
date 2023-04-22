let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');

// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution(input) {
  //초기화
  const N = parseInt(input[0]);

  const dx = [0, -1, 1, 0, 0];
  const dy = [0, 0, 0, -1, 1];

  const map = [];
  const visited = [];
  for (let i = 1; i <= N; i += 1) map[i - 1] = input[i].split(' ').map(Number);
  for (let i = 0; i < N; i += 1) visited[i] = new Array(N).fill(0);
  let money = 1000000000;
  let result = [];

  function DFS(start, totalMoney, seed, visited) {
    if (seed === 0) {
      //모은돈보다 돈이 더 적은지 검사.

      if (money > totalMoney) money = totalMoney;
      return; //DFS 종료
    }

    for (let i = start; i < N * N; i += 1) {
      let flag = true;
      //심어도 되는가?
      for (let m = 0; m < 5; m += 1) {
        let x = Math.floor(i / N) + dx[m];
        let y = Math.floor(i % N) + dy[m];

        if (x < 0 || x >= N || y < 0 || y >= N) {
          flag = false;
          break;
        }
        if (visited[x][y] === 1) {
          flag = false;
          break;
        }

        //위 조건을 모두 통과하면 심어 도 됨
      }
      //심어도 되는 위치지만 , 다른 심는위치와 피는위치의 구분 때문에 flag를 세움

      if (flag === true) {
        for (let m = 0; m < 5; m += 1) {
          let x = Math.floor(i / N) + dx[m];
          let y = Math.floor(i % N) + dy[m];
          if (x < 0 || x >= N || y < 0 || y >= N) {
            break;
          }
          //seed = seed - 1;
          //돈 저장
          totalMoney += map[x][y];
          //좌표 체크
          visited[x][y] = 1;
        }
        //심은 상태로 돌리고
        DFS(i + 1, totalMoney, seed - 1, visited.slice(0));

        //안심은 경우의 수로 돌려줌
        for (let m = 0; m < 5; m += 1) {
          let x = Math.floor(i / N) + dx[m];
          let y = Math.floor(i % N) + dy[m];
          if (x < 0 || x >= N || y < 0 || y >= N) {
            break;
          }
          //돈 저장
          totalMoney -= map[x][y];
          visited[x][y] = 0;
          //좌표 체크
        }
      }
    }
  }

  DFS(0, 0, 3, visited);
  console.log(money);
}
solution(input);
