let fs = require('fs');
// const input = fs
//   .readFileSync(__dirname + '/example.txt')
//   .toString()
//   .split('\n');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

class queue {
  constructor() {
    this.q = [];
  }

  push(i) {
    this.q.push(i);
  }

  pop() {
    if (this.q.length > 0) {
      const num = this.q.splice(0, 1);
      return num;
    } else {
      return -1;
    }
  }

  size() {
    return this.q.length;
  }

  empty() {
    return this.q.length === 0 ? 1 : 0;
  }
  front() {
    return this.q.length === 0 ? -1 : this.q[0];
  }
  back() {
    return this.q.length === 0 ? -1 : this.q[this.q.length - 1];
  }
}

function solution(input) {
  const n = parseInt(input[0]);
  const answer = [];
  const q = new queue();

  for (let i = 1; i <= n; i += 1) {
    const order = input[i].split(' ');
    if (order[0] === 'push') {
      q.push(parseInt(order[1]));
    } else if (order[0] === 'pop') {
      answer.push(q.pop());
    } else if (order[0] === 'size') {
      answer.push(q.size());
    } else if (order[0] === 'empty') {
      answer.push(q.empty());
    } else if (order[0] === 'front') {
      answer.push(q.front());
    } else if (order[0] === 'back') {
      answer.push(q.back());
    }
  }

  console.log(answer.join('\n'));
}
solution(input);
