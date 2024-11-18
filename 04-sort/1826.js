// 1차 답안
/**
 * 목표 거리: 100 처음 연료 : 10
 * 6 20 10 - 6 + 20
 * 7 30 10 - 7 + 30
 * 8 10 10 - 8 + 10
 * 9 5 10 -
 * 12 10
 * .
 * .
 * .
 * .
 */
// let [N, ...rest] = require("fs")
//   .readFileSync("./input.txt")
//   .toString()
//   .trim()
//   .split("\n");

// N = Number(N);
// let arr = rest.slice(0, N).map((x) => x.split(" ").map(Number));
// arr = arr.sort((a, b) => a[0] - b[0]);
// const [L, P] = rest[rest.length - 1].split(" ").map(Number);

// let count = 0; // 주유소 방문 횟수
// let currPos = 0; // 현재 위치
// let currP = P; // 현재 연료
// let maxP = 0; // 후보 중 갈 수 있는 최대 연료
// let maxIdx = -1; // 최대 후보의 index
// let currIdx = -1;
// let impossible = false;

// while (true) {
//   if (currPos + currP >= L) break;
//   if (currIdx === arr.length - 1) {
//     impossible = true;
//     break;
//   }
//   if (impossible) break;

//   maxP = 0;

//   // 후보 중 max 탐색
//   for (let i = currIdx + 1; i < arr.length; i++) {
//     // 현재 연료보다 클 경우 break
//     if (arr[i][0] - currPos > currP) {
//       if (i === currIdx + 1) {
//         impossible = true;
//         break;
//       }
//       break;
//     }
//     // 현재 연료 - 사용 연료 + 주는 연료 + 해당 주유소 위치로 최댓값 계산
//     let usedP = arr[i][0] - currPos;
//     let possibleP = arr[i][1];
//     if (currPos + currP + possibleP >= L) {
//       maxIdx = i;
//       maxP = currP - usedP + possibleP;
//       break;
//     }
//     if (currP - usedP + possibleP >= maxP) {
//       maxIdx = i;
//       maxP = currP - usedP + possibleP;
//     }
//   }

//   currIdx = maxIdx;
//   currPos = arr[maxIdx][0];
//   currP = maxP;
//   count++;
// }
// if (impossible) count = -1;
// console.log(count);

// 2차 답안
/**
 * 현재 갈 수 있는 후보 중 잔여 연료가 가장 많은 주유소를 택하는 방식은
 * 최소점을 못 구할 수도 있고 갈 수 있는 걸 없다고 할 수도 있음.
 *
 * 그런데 생각해보면 초기 연료 + (내가 들르는 주유소의 연료들) >= 전체 거리이면
 * 무조건 갈 수 있음.
 * 그래서 현재 갈 수 있는 주유소들을 최대힙에 push하고,
 * 그 중에 연료가 가장 많은 걸 pop하고,
 * 도착할 수 있는지 체크하고 없으면 다시 갈 수 있는 주유소를 다 push하고.
 */
let [N, ...rest] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

N = Number(N);
let arr = rest.slice(0, N).map((x) => x.split(" ").map(Number));
arr = arr.sort((a, b) => b[0] - a[0]);
arr = arr.map(([a, b]) => [b, a]);
const [L, P] = rest[rest.length - 1].split(" ").map(Number);

class MaxHeapForArray {
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
    while (curIdx > 0 && this.heap[curIdx][0] > this.heap[parIdx][0]) {
      this.swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = this.getParIdx(curIdx);
    }
  }

  heapPop() {
    if (!this.heap.length) return;

    const max = this.heap[0][0];
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

      if (
        leftIdx < this.heap.length &&
        this.heap[leftIdx][0] > this.heap[maxIdx][0]
      )
        maxIdx = leftIdx;

      if (
        rightIdx < this.heap.length &&
        this.heap[rightIdx][0] > this.heap[maxIdx][0]
      )
        maxIdx = rightIdx;

      if (maxIdx === curIdx) break;

      this.swap(curIdx, maxIdx);
      curIdx = maxIdx;
    }
    return max;
  }
}

let count = 0; // 주유소 방문 횟수
let currPos = 0; // 현재 위치
let currFuel = P; // 현재 연료
let maxP = 0; // 후보 중 갈 수 있는 최대 연료
let maxIdx = -1; // 최대 후보의 index
let currIdx = -1;
let impossible = false;

const stations = new MaxHeapForArray();

while (true) {
  // 만약 현재 연료가 전체 거리 이상이라면 종료
  if (currFuel >= L) break;

  // 그렇지 않다면, 현재 연료로 갈 수 있는 주유소들을 heapPush
  let i = arr.length - 1;
  while (i >= 0 && currFuel >= arr[i][1]) {
    stations.heapPush(arr.pop());
    i--;
  }

  // pop할 것이 없다면 -1로 종료
  if (!stations.heap.length) {
    count = -1;
    break;
  }

  // 루트를 pop한 뒤, 현재 연료값 업데이트
  currFuel += stations.heapPop();
  count++;
}

console.log(count);
