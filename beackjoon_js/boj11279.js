let fs = require('fs');
const input = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');
//const input = fs.readFileSync('/dev/stdin').toString().split('\n');
class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  heappush(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parentIdx = Math.floor(curIdx / 2);

    while (parentIdx !== 0 && this.heap[parentIdx] < this.heap[curIdx]) {
      this.swap(curIdx, parentIdx);

      curIdx = parentIdx;
      parentIdx = Math.floor(curIdx / 2);
    }
  }

  heappop() {
    //0번쨰는 비우는듯
    if (this.heap.length === 2) return this.heap.pop();

    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();

    let currentIndex = 1;
    let leftIndex = 2;
    let rightIndex = 3;

    while (
      this.heap[currentIndex] < this.heap[leftIndex] ||
      this.heap[currentIndex] < this.heap[rightIndex]
    ) {
      if (this.heap[leftIndex] < this.heap[rightIndex]) {
        this.swap(currentIndex, rightIndex);
        currentIndex = rightIndex;
      } else {
        this.swap(currentIndex, leftIndex);
        currentIndex = leftIndex;
      }

      leftIndex = currentIndex * 2;
      rightIndex = currentIndex * 2 + 1;
    }

    return returnValue;
  }
  length() {
    return this.heap.length;
  }
}

function solution() {
  const mxHeap = new MaxHeap();
  const n = input[0];
  const arr = [];
  for (let i = 1; i <= n; i += 1) {
    if (mxHeap.length() === 1 && parseInt(input[i]) === 0) {
      arr.push(0);
    } else if (mxHeap.length() > 1 && parseInt(input[i]) === 0) {
      arr.push(mxHeap.heappop());
    } else {
      mxHeap.heappush(parseInt(input[i]));
    }
  }

  console.log(arr.join('\n'));
}

solution();
