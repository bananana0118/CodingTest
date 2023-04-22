const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'example.txt')
  .toString()
  .trim()
  .split('\n');
const [A, B] = input[0].split(' ').map(Number);

function solution() {
  let result = -1;
  function DFS(num, count) {
    //문자열일 때도 있으니
    if (num == B) {
      result = count;
      return;
    }
    if (num > B) {
      return;
    }

    DFS(num * 2, count + 1);
    DFS(num + '1', count + 1);
  }
  DFS(A, 1);
  console.log(result);
}

solution();
