// 1차 답안
/**
 * d가 0이 되면 과제를 못한다.
 * 우선은 최대한 모든 날에 하는 것이 좋을 것. 즉, 과제 개수만큼만 루프를 돌리면 된다.
 * 그리고 거꾸로 N일차부터 1일차까지 가야 함. 왜냐하면 가능하던 것이 사라지는 것보다, 안 되던 것이 활성화되어야
 * 마감일에 따른 우선순위를 고려하지 않고 그냥 깡 최대값으로만 처리를 할 수 있음.
 */

let [N, ...rest] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
N = Number(N);
const arr = rest.map((val) => val.split(" ").map(Number));

// MaxHeap 구현
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  getParIdx(idx) {
    return Math.floor((idx - 1) / 2);
  }

  swap(idxA, idxB) {
    [this.heap[idxA], this.heap[idxB]] = [this.heap[idxB], this.heap[idxA]];
  }

  heapPush(val) {
    this.heap.push(val);
    let curIdx = this.heap.length - 1;
    let parIdx = this.getParIdx(curIdx);
    while (curIdx > 0 && this.heap[curIdx] > this.heap[parIdx]) {
      this.swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = this.getParIdx(curIdx);
    }
  }

  heapPop() {
    if (!this.heap.length) return;

    const max = this.heap[0];
    if (this.heap.length === 1) {
      this.heap = [];
      return max;
    } else {
      this.heap[0] = this.heap.pop();
    }

    let curIdx = 0;
    while (true) {
      const leftIdx = curIdx * 2 + 1;
      const rightIdx = curIdx * 2 + 2;
      let maxIdx = curIdx;

      if (leftIdx < this.heap.length && this.heap[leftIdx] > this.heap[maxIdx])
        maxIdx = leftIdx;

      if (
        rightIdx < this.heap.length &&
        this.heap[rightIdx] > this.heap[maxIdx]
      )
        maxIdx = rightIdx;

      if (maxIdx === curIdx) break;

      this.swap(curIdx, maxIdx);
      curIdx = maxIdx;
    }
    return max;
  }
}

// 정답 처리
const heap = new MaxHeap();
let answer = 0;
for (let i = N; i >= 1; i--) {
  arr.forEach((val) => {
    if (val[0] === i || (i === N && val[0] > i)) heap.heapPush(val[1]);
  });

  if (heap.heap.length) answer += heap.heapPop();
}

console.log(answer);
