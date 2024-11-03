// // 1차 답안
// /**
//  * 하던 대로 heap class 만들고, Heappop을 두 개 만들면 되지 않을까?
//  */
// const [N, ...rest] = require("fs")
//   .readFileSync("./input.txt")
//   .toString()
//   .trim()
//   .split("\n");

// const cmdArr = [];

// // 전처리
// rest.forEach((val, idx, arr) => {
//   if (val.length === 1) {
//     const v = Number(val);
//     let arrs = [];
//     for (let i = idx + 1; i <= idx + v; i++) {
//       let toPut = arr[i].split(" ");
//       arrs.push(toPut);
//     }
//     arrs = arrs.map(([first, second]) => [first, Number(second)]);
//     cmdArr.push(arrs);
//   }
// });

// // Heap class(maxheap)
// class Heap {
//   constructor() {
//     this.heap = [];
//   }

//   getParIdx(idx) {
//     return Math.floor((idx - 1) / 2);
//   }

//   swap(idxA, idxB) {
//     [this.heap[idxA], this.heap[idxB]] = [this.heap[idxB], this.heap[idxA]];
//   }

//   heapPush(val) {
//     this.heap.push(val);
//     let curIdx = this.heap.length - 1;
//     let parIdx = this.getParIdx(curIdx);
//     while (curIdx > 0 && this.heap[curIdx] > this.heap[parIdx]) {
//       this.swap(curIdx, parIdx);
//       curIdx = parIdx;
//       parIdx = this.getParIdx(curIdx);
//     }
//   }

//   // 원래의 heappop()과 같이 root node 제거
//   heapShift() {
//     if (!this.heap.length) return;

//     const max = this.heap[0];
//     if (this.heap.length === 1) {
//       this.heap = [];
//       return max;
//     } else {
//       this.heap[0] = this.heap.pop();
//     }

//     let curIdx = 0;
//     while (true) {
//       const leftIdx = curIdx * 2 + 1;
//       const rightIdx = curIdx * 2 + 1;
//       let maxIdx = curIdx;

//       if (leftIdx < this.heap.length && this.heap[leftIdx] > this.heap[maxIdx])
//         maxIdx = leftIdx;

//       if (
//         rightIdx < this.heap.length &&
//         this.heap[rightIdx] > this.heap[maxIdx]
//       )
//         maxIdx = rightIdx;

//       if (maxIdx === curIdx) break;

//       this.swap(curIdx, maxIdx);
//       curIdx = maxIdx;
//     }
//     return max;
//   }

//   // 가장 끝 원소, 즉 최솟값을 빼는 것
//   heapPop() {
//     if (!this.heap.length) return;
//     return this.heap.pop();
//   }
// }

// // 정답 처리
// const answer = [];
// cmdArr.forEach((cmds) => {
//   const heap = new Heap();
//   cmds.forEach((cmd) => {
//     if (cmd[0] === "I") {
//       heap.heapPush(cmd[1]);
//     } else {
//       cmd[1] === 1 ? heap.heapShift() : heap.heapPop();
//     }
//   });
//   console.log(heap);
// });
// console.log(answer.join("\n"));

// 2차 답안
/**
 * 최대 힙에서 최소값을 단순히 저렇게 pop()으로 뽑아낼 수 없다는 사실 깨달음.
 * 힙에서 트리는 느슨한 정렬 상태이기 때문.
 * 그렇기 때문에 최대힙과 최소힙을 따로 만들어서 처리해야 함.
 * 삽입은 둘 다 하고, 삭제는 각각에 해당하는 삭제만 하면 된다.
 */
const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// Heap class(maxheap)
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

  heapPush(val) {
    this.heap.push(val);
    let curIdx = this.heap.length - 1;
    let parIdx = this.getParIdx(curIdx);
    while (curIdx > 0 && this.heap[curIdx] < this.heap[parIdx]) {
      this.swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = this.getParIdx(curIdx);
    }
  }

  heapPop() {
    if (!this.heap.length) return;

    const min = this.heap[0];
    if (this.heap.length === 1) {
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

      if (leftIdx < this.heap.length && this.heap[leftIdx] < this.heap[minIdx])
        minIdx = leftIdx;

      if (
        rightIdx < this.heap.length &&
        this.heap[rightIdx] < this.heap[minIdx]
      )
        minIdx = rightIdx;

      if (minIdx === curIdx) break;

      this.swap(curIdx, minIdx);
      curIdx = minIdx;
    }
    return min;
  }
}

// 정답 처리
const maxHeap = new MaxHeap();
const minHeap = new MinHeap();
let length = 0;
let visited = new Map();

const answer = [];
input.forEach((line) => {
  // 명령어가 아닌 숫자인 경우
  if (!line.includes(" ")) {
    answer.push(
      length > 0 && maxHeap.heap[0] && minHeap.heap[0]
        ? `${maxHeap.heap[0]} ${minHeap.heap[0]}`
        : "EMPTY"
    );
    maxHeap.heap = [];
    minHeap.heap = [];
  } else {
    const [cmd, val] = line.split(" ");
    if (cmd === "I") {
      const targetNum = Number(val);
      length++;
      maxHeap.heapPush(targetNum);
      minHeap.heapPush(targetNum);
      if (visited.has(targetNum)) {
        visited.set(targetNum, visited.get(targetNum) + 1);
      } else {
        visited.set(targetNum, 1);
      }
    } else {
      // cmd === "D"
      length > 0 && length--;
      if (length <= 0) {
        maxHeap.heap = [];
        minHeap.heap = [];
      } else {
        if (val === "1") {
          while (maxHeap.heap.length > 0) {
            const popped = maxHeap.heapPop();
            if (visited.get(popped) > 0) {
              visited.set(popped, visited.get(popped) - 1);
              break;
            }
          }
        } else {
          while (minHeap.heap.length > 0) {
            const popped = minHeap.heapPop();
            if (visited.get(popped) > 0) {
              visited.set(popped, visited.get(popped) - 1);
              break;
            }
          }
        }
      }
      while (maxHeap.heap.length > 0 && visited.get(maxHeap.heap[0]) === 0) {
        maxHeap.heapPop();
      }
      while (minHeap.heap.length > 0 && visited.get(minHeap.heap[0]) === 0) {
        minHeap.heapPop();
      }
    }
  }
});

// 마지막 결과값 출력을 위함
answer.push(
  length > 0 && maxHeap.heap[0] && minHeap.heap[0]
    ? `${maxHeap.heap[0]} ${minHeap.heap[0]}`
    : "EMPTY"
);

// 첫 두 EMPTY를 빼고 출력
console.log(answer.slice(2).join("\n"));
