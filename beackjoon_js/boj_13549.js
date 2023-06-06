let fs = require('fs');
const { nextTick } = require('process');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .trim()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');
let index = 0;

const [n, k] = input[index++].split(' ').map(Number);
const visit = Array.from({ length: 100100 }, () => 0);

function bfs(N) {
  const queue = [];
  queue.push([N, 0]);
  visit[N] = 1;
  while (queue.length) {
    const [cur, time] = queue.shift();
    if (cur === k) return time;
    for (next of [cur * 2, cur - 1, cur + 1]) {
      if (!visit[next] && next >= 0 && next <= 100000) {
        visit[next] = 1;
        if (next === cur * 2) {
          queue.unshift([next, time]); // 2x로 이동할땐 시간 증가시키지 x
        } else {
          queue.push([next, time + 1]);
        }
      }
    }
  }
}

const solution = () => {
  console.log(bfs(n));
};

solution();
