let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .trim()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution(input) {
  const N = input[0].split(' ').map(Number);
  const obj = {};
  let stack = [];

  for (let i = 1; i <= N; i += 1) {
    const [node, left, right] = input[i].split(' ');
    obj[`${node}`] = [left, right];
  }
  DFS_pre('A');

  function DFS_pre(v) {
    stack.push(v);

    let node = obj[v][0];
    if (node !== '.') {
      DFS_pre(node);
    }
    node = obj[v][1];
    if (node !== '.') {
      DFS_pre(node);
    }
  }
  console.log(stack.join(''));
  stack = [];
  DFS_middle('A');
  function DFS_middle(v) {
    let node = obj[v][0];
    if (node !== '.') {
      DFS_middle(node);
    }
    stack.push(v);
    node = obj[v][1];
    if (node !== '.') {
      DFS_middle(node);
    }
  }
  console.log(stack.join(''));
  stack = [];
  DFS_last('A');
  function DFS_last(v) {
    let node = obj[v][0];
    if (node !== '.') {
      DFS_last(node);
    }
    node = obj[v][1];
    if (node !== '.') {
      DFS_last(node);
    }
    stack.push(v);
  }
  console.log(stack.join(''));
}

solution(input);
