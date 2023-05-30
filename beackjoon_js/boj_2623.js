let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .trim()
  .split('\n');

let index = 0;
function solution() {
  const [N, M] = input[index++].split(' ').map(Number);
  const arr = Array.from(Array(N + 1), () => []);
  const indegree = new Array(N + 1).fill(0);

  for (let i = 0; i < M; i += 1) {
    const temp = input[index++].split(' ').map(Number);
    const len = temp[0];
    for (let j = 1; j < len; j++) {
      arr[temp[j]].push(temp[j + 1]);
      //1=>2=>3으로 진행되기 때문에 3에들어오는 indegree는 1이다.
      indegree[temp[j + 1]] += 1;
    }
  }

  const result = [];
  const queue = [];

  for (let i = 1; i < N + 1; i++) {
    //만약 진입차수가 0이면 큐의 정점에 추가한다.
    if (indegree[i] === 0) {
      queue.push(i);
    }
  }

  while (queue.length) {
    temp = queue.shift();
    result.push(temp); //뺀값은 indegree가 0이였다는 뜻이므로 result에 들어감

    for (const el of arr[temp]) {
      indegree[el] -= 1; //다음 노드의 indegree줄여줌
      if (indegree[el] === 0) {
        queue.push(el);
      }
    }
  }

  if (result.length === N) {
    const answer = result.join('\n');
    console.log(answer);
  } else {
    console.log(0);
  }
}

solution();
