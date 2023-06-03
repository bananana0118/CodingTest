let fs = require('fs');
const [N, ...table] = fs
  .readFileSync(__dirname + '/example.txt')
  .toString()
  .split('\n');
// const [N, ...table] = fs.readFileSync('/dev/stdin').toString().split('\n');
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(node) {
    this.heap.push(node);
    this.heapifyUp();
  }

  pop() {
    if (!this.heap.length) return null;

    const rootNode = this.heap[0];
    this.swap(0, this.heap.length - 1);
    this.heap.pop();
    this.heapifyDown();
    return rootNode;
  }

  heapifyUp() {
    let currentIdx = this.heap.length - 1;
    while (true) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);

      if (this.compare(this.heap[parentIdx], this.heap[currentIdx])) {
        this.swap(currentIdx, parentIdx);
        currentIdx = parentIdx;
        continue;
      }
      return;
    }
  }

  heapifyDown() {
    let currentIdx = 0;
    while (true) {
      const current = this.heap[currentIdx];
      const leftChildIdx = currentIdx * 2 + 1;
      const rightChildIdx = currentIdx * 2 + 2;
      const leftChild = this.heap[leftChildIdx];
      const rightChild = this.heap[rightChildIdx];

      if (leftChild === undefined && rightChild === undefined) return;
      if (this.compare(rightChild ?? +Infinity, leftChild)) {
        if (this.compare(current, leftChild)) {
          this.swap(currentIdx, leftChildIdx);
          currentIdx = leftChildIdx;
          continue;
        }
      }

      if (this.compare(current, rightChild)) {
        this.swap(currentIdx, rightChildIdx);
        currentIdx = rightChildIdx;
        continue;
      }
      return;
    }
  }
  compare(node1, node2) {
    return node1 > node2;
  }
  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  size() {
    return this.heap.length;
  }
}

function solution() {
  const n = parseInt(N);
  const arr = table.map(v => v.split(' ').map(Number));
  arr.sort((a, b) => a[0] - b[0]);

  const minHeap = new MinHeap();

  //최초 노드의 끝나는 시간 넣어줌
  minHeap.push(arr[0][1]);

  for (let i = 1; i < n; i++) {
    const [start, end] = arr[i];
    const startTime = minHeap.pop();

    //바로 시작할 수 없으므로 그냥 새로 넣어줌
    if (startTime > start) minHeap.push(startTime);
    minHeap.push(end);
  }
  console.log(minHeap.size());
}
solution();
