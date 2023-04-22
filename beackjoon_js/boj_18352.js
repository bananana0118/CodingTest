const fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');
//const input = fs.readFileSync('/dev/stdin').toString().split('\n');

function solution(input) {
  const [cities, roads, K, start] = input[0].split(' ').map(Number);
  const map = Array.from(new Array(cities + 1), () => []);
  //그래프 전처리

  input.shift();

  for (let i = 0; i < roads; i += 1) {
    const [from, to] = input[i].split(' ').map(Number);
    map[from].push(to);
  }
  const result = [];
  const visited = Array.from(new Array(cities + 1), () => -1);
  //최단거리 구하기
  function bfs(city) {
    let q = [city];
    visited[city] = 0;

    while (q.length > 0) {
      const value = q.shift();

      if (visited[value] === K) {
        result.push(value);
        continue;
      }

      for (let i = 0; i < map[value].length; i += 1) {
        const v = map[value][i];

        if (visited[v] === -1) {
          visited[v] = visited[value] + 1;
          q.push(v);
        }
      }
    }
  }
  bfs(start);
  result.sort((a, b) => a - b);
  result.length === 0
    ? console.log(-1)
    : console.log(result.sort((a, b) => a - b).join('\n'));
}
solution(input);
