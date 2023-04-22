const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n")
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .replace(/\r/g, '')
  .split('\n');

class Node {
  constructor(data) {
    this.data = data;
    this.link = null;
  }
}
class ListQueue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }
  isEmpty() {
    if (this.front === null) return 1;
    return 0;
  }
  enQueue(data) {
    let newNode = new Node(data);
    if (this.isEmpty() === 1) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.link = newNode;
      this.rear = newNode;
    }
    this.size = this.size += 1;
  }
  deQueue() {
    if (this.isEmpty() === 1) {
      return -1;
    } else {
      this.size = this.size - 1;
      let deQueueData = this.front.data;
      this.front = this.front.link;
      if (this.front === null) {
        this.rear = null;
      }
      return deQueueData;
    }
  }
  getSize() {
    return this.size;
  }
}

//동서남북
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
function solution(input) {
  const [M, N] = input[0].split(' ').map(Number);
  const box = new Array(N);
  const visited = Array.from(Array(N), () => new Array(M).fill(0));
  const queue = new ListQueue();
  for (let i = 0; i < N; i += 1) {
    box[i] = input[i + 1].split(' ').map(Number);
  }
  let hasZero = false;
  for (let i = 0; i < N; i += 1) {
    //행,
    for (let j = 0; j < M; j += 1) {
      //열
      if (box[i][j] === 0) hasZero = true;
      if (box[i][j] === 1) {
        queue.enQueue([i, j]);
        visited[i][j] = 1;
      }
      if (box[i][j] === -1) {
        visited[i][j] = -1;
      }
    }
  }
  if (!hasZero) console.log(0);
  else {
    bfs();
    const arr = visited.flat(2);

    if (arr.includes(0)) {
      console.log(-1);
    } else {
      console.log(Math.max(...arr) - 1);
    }
  }
  function bfs() {
    while (queue.getSize()) {
      const [myY, myX] = queue.deQueue();
      for (let i = 0; i < 4; i += 1) {
        nx = myX + dx[i];
        ny = myY + dy[i];

        if (
          nx < 0 ||
          nx >= M ||
          ny < 0 ||
          ny >= N ||
          box[ny][nx] !== 0 ||
          visited[ny][nx] !== 0
        ) {
          continue;
        }
        visited[ny][nx] = visited[myY][myX] + 1;
        queue.enQueue([ny, nx]);
      }
    }
  }
}
solution(input);
