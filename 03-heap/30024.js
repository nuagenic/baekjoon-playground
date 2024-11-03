// 1차 답안
/**
 * 현재 가능한 것 중 가장 우선순위가 높은 것을 먹어야 한다는 점에서, Priority queue 사용.
 */
// 전처리
const [NM, ...rest] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = NM.split(" ").map(Number);
const corns = [];
const K = Number(rest[rest.length - 1]);

rest.forEach((line, idx, arr) => {
  if (idx === arr.length - 1) return;
  corns.push(line.split(" ").map(Number));
});

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

const heap = new MaxHeap();

// 인덱스 탐색 여부를 확인하는 map 만들기
const cornMap = new Map();

// 바깥 둘레의 corns를 heappush
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (i === 0 || i === N - 1 || j === 0 || j === M - 1) {
      cornMap.set(corns[i][j], {
        row: i + 1,
        col: j + 1,
      });
      heap.heapPush(corns[i][j]);
    }
  }
}

// heapPop 하면서, 가능한 것들을 heapPush
let counter = 0;
const answer = [];
while (counter < K) {
  let poppedCorn = heap.heapPop();
  let [curRow, curCol] = [
    cornMap.get(poppedCorn).row - 1,
    cornMap.get(poppedCorn).col - 1,
  ];

  // 상하좌우 추가
  const toAdd = [];
  if (curRow < N - 1)
    toAdd.push({
      item: corns[curRow + 1][curCol],
      row: curRow + 2,
      col: curCol + 1,
    }); // 하
  if (curRow > 0)
    toAdd.push({
      item: corns[curRow - 1][curCol],
      row: curRow,
      col: curCol + 1,
    }); // 상
  if (curCol > 0)
    toAdd.push({
      item: corns[curRow][curCol - 1],
      row: curRow + 1,
      col: curCol,
    }); // 좌
  if (curCol < M - 1)
    toAdd.push({
      item: corns[curRow][curCol + 1],
      row: curRow + 1,
      col: curCol + 2,
    }); // 우

  toAdd.forEach((corn) => {
    if (cornMap.get(corn.item)) return;
    cornMap.set(corn.item, {
      row: corn.row,
      col: corn.col,
    });
    heap.heapPush(corn.item);
  });

  answer.push(`${curRow + 1} ${curCol + 1}`);
  counter++;
}

console.log(answer.join("\n"));
