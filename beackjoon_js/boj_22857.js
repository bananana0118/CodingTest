const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

let n = 0;

const solution = () => {
  let cnt = 0;
  let graph = [],
    visited = [];
  const [x, y] = input[i].split(' ').map(Number);

  if (x === 0 && y === 0) {
    return;
  }
  graph = Array.from(Array(y), () => new Array(x).fill(0));
  visited = Array.from(Array(y), () => new Array(x).fill(0));

  assignment(w, h);

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (graph[i][j] === 1) {
        DFS(i, j);
        cnt += 1;
      }
    }
  }
  console.log(cnt);
};


const assignment = (x, y) => {
  graph = Array.from(Array(y), () => new Array(x).fill(0));
  visited = Array.from(Array(y), () => new Array(x).fill(0));
  for (let j = 0; j < y; j += 1) {
    let temp = input[j].split(' ').map(Number);
    graph[j] = temp;
  }
  input = input.slice(y);
  console.log(graph);
};


const DFS = (i,j)=>{
    if(i>=0 && i<h && j >=0 && j<w && graph[i][j]===1){
        graph[i][j] = 0
    }
    
}