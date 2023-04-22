const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
let input = require('fs').readFileSync(filePath).toString().trim().split('\n');
let index = 0;

let T = parseInt(input[index++]);

const solution = () => {
  let t = 0;

  while (t < T) {
    const [cntBuild, cntRule] = input[index++].split(' ').map(Number);
    const buildTime = input[index++].split(' ').map(Number);
    const bluePrint = {};
    for (let i = 0; i < cntRule; i += 1) {
      const [from, to] = input[index++].split(' ').map(Number);
      bluePrint[to] ? bluePrint[to].push(from) : (bluePrint[to] = [from]);
    }
    const target = parseInt(input[index++]);
    let result = 0;
    result += buildTime[target - 1];

    const visited = Array(cntBuild).fill(0);

    BFS([target], visited);

    function BFS(queue, visited) {
      const node = queue.shift();
      let times = [];
      console.log('node : ' + node);

      console.log('length ' + length);
      const sumbArr = bluePrint[node];

      for (let i = 0; i < length; i += 1) {
        const value = sumbArr[i];
        console.log('value:' + value);
        if (visited[value] === 0) {
          queue.push(value);
          visited[value] = 1;
          console.log(value);
          times.push(buildTime[value - 1]);
        }
      }

      if (times.length > 0) result += Math.max(...times);
      console.log('result', result);
      if (queue.length > 0) BFS(queue, visited);
    }

    t++;
  }
};

solution();
