// 1차 답안
/**
 * 카드 묶음이 N개 있다고 할 때, 합치는 횟수는 N -1 이다.
 * 그리고 각각의 묶음은
 * 10 20 30 40
 * 10 20
 * 10 20 30
 * 10 20 30 40
 * 이런 식으로 되어야 최소다.
 * 즉, N개의 카드 묶음을 sort하고,
 * 첫 번째와 두번째 묶음은 N-1회, 그 다음부터 N-2회, ... 1회씩 더해주면 된다.
 */

// const [N, ...arr] = require("fs")
//   .readFileSync("./input.txt")
//   .toString()
//   .trim()
//   .split("\n")
//   .map(Number);

// const sortedArr = arr.sort((a, b) => a - b);
// let answer = 0;

// sortedArr.forEach((x, idx) => {
//   answer += x * (N - idx);
// });
// answer -= sortedArr[0];

// console.log(answer);

// 2차 답안
/**
 * 각 시도에서 가장 작은 것이 sorted된 array의 앞쪽 인덱스가 아닐 수도 있겠다는 생각.
 * 10 20 20 25 40
 * 원래대로 한다면 30 + 50 + 75 + 115 = 270
 * 그러나 (10+20) + (20+25) + (30+40) + (45+70) = 260
 */
const [N, ...arr] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const sortedArr = arr.sort((a, b) => a - b);
let answer = 0;

class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParIdx(idx) {
    return Math.floor((idx - 1) / 2);
  }

  swap(idxA, idxB) {
    [this.heap[idxA], this.heap[idxB]] = [this.heap[idxB], this.heap[idxA]];
  }

  heappush(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parIdx = this.getParIdx(curIdx);

    while (curIdx > 0 && this.heap[curIdx] < this.heap[parIdx]) {
      this.swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = this.getParIdx(curIdx);
    }
  }

  heappop() {
    if (!this.heap.length) return;

    const min = this.heap[0];
    if (this.heap.length <= 1) {
      this.heap = [];
      return min;
    } else {
      this.heap[0] = this.heap.pop();
    }

    let curIdx = 0;
    while (true) {
      const leftIdx = curIdx * 2 + 1;
      const rightIdx = curIdx * 2 + 2;
      let minIdx = curIdx;

      if (
        leftIdx < this.heap.length &&
        this.heap[leftIdx] < this.heap[minIdx]
      ) {
        minIdx = leftIdx;
      }

      if (
        rightIdx < this.heap.length &&
        this.heap[rightIdx] < this.heap[minIdx]
      ) {
        minIdx = rightIdx;
      }

      if (minIdx === curIdx) break;

      this.swap(curIdx, minIdx);
      curIdx = minIdx;
    }

    return min;
  }
}

const heap = new MinHeap();

sortedArr.forEach((x) => {
  heap.heappush(x);
});

while (heap.heap.length > 1) {
  const first = heap.heappop();
  const second = heap.heappop();
  answer += first + second;
  heap.heappush(first + second);
}

console.log(answer);
