const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().split("\n")
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .replace(/\r/g, '')
  .split('\n');
function solution(input) {
  let chkZero = false;
  let i = 0;
  let j = 0;
  let k = 0;
  let result = [];
  let graph = {};
  while (i < input.length) {
    const items = input[i].split(' ').map(Number);

    //줄바꿈 패스
    j = 0;
    while (j < items.length) {
      let [a, b] = [items[j], items[j + 1]];
      if (a === 0 && b === 0) {
        break;
      }
      if (a === 0) {
        j += 1;
        continue;
      }
      if (a === -1 && b === -1) {
        chkZero = true;
        break;
      }
      if (graph[a] === undefined) {
        graph[a] = [];
      }
      graph[a].push(b);
      j += 3;
    }
    if (chkZero) {
      k += +1;
      BFS(graph, k);
      break;
    }

    if (items.length <= 1) {
      k += 1;
      i += 1;
      BFS(graph, k);
      graph = {};
      continue;
    }
    i += 1;
  }
  //입력받고, 트리만든 후, BFS
  function BFS(set, k) {
    const iv = {};
    const uv = {};
    const visited = [];
    const keys = Object.keys(set).map(Number);
    let q = keys;

    if (keys.length === 0) {
      result.push(`Case ${k} is a tree.`);
      return;
    }

    while (q.length !== 0) {
      const curr = q.shift();
      uv[curr] = set[curr] === undefined ? 0 : set[curr].length;
      iv[curr] = iv[curr] === undefined ? 0 : iv[curr];

      if (set[curr] !== undefined) {
        visited.push(curr);
        for (let next of set[curr]) {
          iv[next] = iv[next] === undefined ? 1 : iv[next] + 1;
          if (set[next] === undefined) uv[next] = 0;
        }
      }
    }

    const rootNode = Object.keys(iv).filter(key => iv[key] === 0);

    Object.keys(iv).filter(key => iv[key] >= 2).length > 0 ||
    rootNode.length !== 1 ||
    Object.keys(iv).filter(key => {
      if (key !== rootNode[0] && iv[key] === 1) return iv[key];
    }).length !==
      Object.keys(iv).length - 1
      ? result.push(`Case ${k} is not a tree.`)
      : result.push(`Case ${k} is a tree.`);
  }
  console.log(result.join('\n'));
}
solution(input);
