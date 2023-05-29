class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);

    let currentIdx = this.heap.length - 1;
    let parentIdx = Math.floor(currentIdx / 2);

    while (parentIdx !== 0 && this.heap[parentIdx] < value) {
      [this.heap[currentIdx], this.heap[parentIdx]] = [
        this.heap[parentIdx],
        this.heap[currentIdx],
      ];

      currentIdx = parentIdx;
      parentIdx = Math.floor(currentIdx / 2);
    }
  }

  pop() {
    const returnValue = this.heap[1];
    let currentIdx = 1;
    let leftIdx = 2;
    let rightIdx = 3;

    if (!returnValue) return 0;
    if (this.heap.length === 2) return this.heap.pop();
    this.heap[1] = this.heap.pop();

    while (
      this.heap[currentIdx] < this.heap[leftIdx] ||
      this.heap[currentIdx] < this.heap[rightIdx]
    ) {
      if (this.heap[leftIdx] < this.heap[rightIdx]) {
        [this.heap[currentIdx], this.heap[rightIdx]] = [
          this.heap[rightIdx],
          this.heap[currentIdx],
        ];
        currentIdx = rightIdx;
      } else {
        [this.heap[currentIdx], this.heap[leftIdx]] = [
          this.heap[leftIdx],
          this.heap[currentIdx],
        ];
        currentIdx = leftIdx;
      }

      leftIdx = currentIdx * 2;
      rightIdx = currentIdx * 2 + 1;
    }

    return returnValue;
  }
}

function solution(n, k, enemy) {
  const maxHeap = new MaxHeap();
  let answer = 0;

  for (let i = 0; i < enemy.length; i++) {
    maxHeap.push(enemy[i]);
    n -= enemy[i];

    if (n < 0) {
      if (k > 0) {
        const max = maxHeap.pop();
        n += max;
        k--;
      } else break;
    }

    answer++;
  }

  return answer;
}
