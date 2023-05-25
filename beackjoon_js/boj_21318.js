const fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');
let index = 0;
let N = parseInt(input[index++]);
const notes = input[index++].split(' ').map(Number);
let question = parseInt(input[index++]);
const practice = [];
const solution = () => {
  const map = {};
  map[0] = 0;
  let count = 0;
  for (let i = 0; i < N; i++) {
    if (notes[i] > notes[i + 1]) {
      count++;
    }
    map[i + 1] = count;
  }
  while (question > 0) {
    const [start, end] = input[index++].split(' ').map(Number);
    let count = 0;
    //y번째에선 실수 하지 않으니 -1
    if (start === end) {
      practice.push(count);
    } else {
      //start-1을 해줘야 하는 이유, 누적값이니까, 그 직전까지의 합을 뺴줘야함
      const mistake = map[end - 1] - map[start - 1];
      practice.push(mistake);
    }
    question--;
  }
  console.log(practice.join('\n'));
};
solution();
