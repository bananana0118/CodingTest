let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution(input) {
  const [N, M] = input[0].split(' ').map(Number);
  const nums = input[1].split(' ').map(Number);
  const visited = [new Array(N).fill(0)];
  const answer = [];

  //수열은 사전 순
  nums.sort((a, b) => a - b);
  function DFS(numarr, count) {
    if (count === M) {
      answer.push(numarr);

      return;
    }

    for (let i = 0; i < nums.length; i += 1) {
      if (visited[i] !== 1) {
        numarr.push(nums[i]);
        visited[i] = 1;
        DFS(numarr.slice(0), count + 1);
        visited[i] = 0;
        numarr.pop();
      }
    }
  }

  DFS([], 0);
  const uniques = [];
  const itemsFound = {};

  //이차원 배열의 유니크 값 찾기, 객체와 json.stringify 를 이용
  for (let i = 0; i < answer.length; i += 1) {
    const strings = JSON.stringify(answer[i]);
    if (itemsFound[strings]) {
      continue;
    }
    uniques.push(answer[i]);
    itemsFound[strings] = true;
  }

  uniques.forEach(e => console.log(e.join(' ')));
}
solution(input);
