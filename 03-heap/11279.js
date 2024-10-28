const [N, ...rest] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const arr = rest.map(Number);

class Heap {
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

    while (curIdx > 0 && this.heap[curIdx] > this.heap[parIdx]) {
      this.swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = this.getParIdx(curIdx);
    }
  }

  heappop() {
    if (!this.heap.length) return 0;

    const max = this.heap[0];
    if (this.heap.length <= 1) {
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

      if (
        leftIdx < this.heap.length &&
        this.heap[leftIdx] > this.heap[maxIdx]
      ) {
        maxIdx = leftIdx;
      }

      if (
        rightIdx < this.heap.length &&
        this.heap[rightIdx] > this.heap[maxIdx]
      ) {
        maxIdx = rightIdx;
      }

      if (maxIdx === curIdx) break;

      this.swap(curIdx, maxIdx);
      curIdx = maxIdx;
    }

    return max;
  }
}

const heap = new Heap();

const answer = [];

arr.forEach((x) => {
  if (x === 0) {
    answer.push(heap.heappop());
  } else {
    heap.heappush(x);
  }
});

console.log(answer.join("\n"));
