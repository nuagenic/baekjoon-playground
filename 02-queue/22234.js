// 1차 답안
/**
 * P1~PN (t1~tN)
 */
// let [NTW, ...rest] = require("fs")
//   .readFileSync("./input.txt")
//   .toString()
//   .trim()
//   .split("\n");
// const [N, T, W] = NTW.split(" ").map(Number);
// rest = rest.map((x) => x.split(" ").map(Number));
// const Ninfo = rest.slice(0, N); // [[1,6], ....]

// let Minfo = rest.slice(N + 1).sort((a, b) => a[2] - b[2]); // [[3,1,5], ....]

// // 0초: N에 있는 사람을 하나씩 받는다. 그리고 T와 분기 처리를 해 일 결정한다.
// // 큐를 하나 만들어야 할 것. 시작과 동시에 N에 해당하는 모든 고객은 큐에 받고, 나머지는 시간에 따라 받는다.
// // 즉, 기준은 W가 되어야 할 것.

// const answer = []; // 정답을 하나씩 push받을 공간
// const queue = []; // 대기줄. 처음에는 N명을 모두 넣어놓고 시작한다.

// // 큐에 N명을 넣기
// Ninfo.forEach((x) => queue.push(x));

// for (let i = 0; i < W; i++) {
//   // 만약 시간이 M의 cx와 같을 때, queue에 push
//   if (Minfo[0] && Minfo[0][2] === i) queue.push(Minfo.shift());

//   // [1]과 [3] 비교. 같으면 shift
//   if (queue[0][1] === queue[0][3]) queue.shift();

//   // T와 [3] 비교. T와 같아지면 [3] = 0, 그리고 shift해서 push
//   if (T === queue[0][3]) {
//     queue[0][3] = 0;
//     queue.push(queue.shift());
//   }

//   // 큐의 0번 요소[3]에 1플러스
//   if (queue[0][3]) {
//     queue[0][3]++;
//   } else {
//     queue[0][3] = 1;
//   }

//   // 큐의 0번 요소 확인. answer에 push
//   answer.push(queue[0][0]);
// }

// console.log(answer.join("\n"));

// 2차 답안
/**
 * 시간 초과 이슈로, 큐보다 deque를 쓰는 게 좋을 것 같다는 결과를 확인
 */
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
    this.workedTime = 0;
  }
}

class Queue {
  constructor() {
    this.init();
  }

  init() {
    this.count = 0;
    this.front = null;
    this.rear = null;
  }

  shift() {
    if (this.count === 0) return null;

    const value = this.front.value;

    if (this.count === 1) {
      this.init();
    } else {
      this.front = this.front.next;
      this.front.prev = null;
      this.count--;
    }

    return value;
  }

  push(value) {
    const node = new Node(value);
    if (this.count === 0) {
      this.front = node;
      this.rear = node;
    } else {
      const prevRear = this.rear;
      prevRear.next = node;
      node.prev = prevRear;
      this.rear = node;
    }
    this.count++;
  }
}

let [NTW, ...rest] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
const [N, T, W] = NTW.split(" ").map(Number);
rest = rest.map((x) => x.split(" ").map(Number));
const Ninfo = rest.slice(0, N); // [[1,6], ....]

let Minfo = rest.slice(N + 1).sort((a, b) => a[2] - b[2]); // [[3,1,5], ....]

// 0초: N에 있는 사람을 하나씩 받는다. 그리고 T와 분기 처리를 해 일 결정한다.
// 큐를 하나 만들어야 할 것. 시작과 동시에 N에 해당하는 모든 고객은 큐에 받고, 나머지는 시간에 따라 받는다.
// 즉, 기준은 W가 되어야 할 것.

const answer = []; // 정답을 하나씩 push받을 공간
const queue = new Queue(); // 대기줄. 처음에는 N명을 모두 넣어놓고 시작한다.
const Mqueue = new Queue();

// 큐에 N명을 넣기
Ninfo.forEach((x) => queue.push(x));

// Minfo를 Mqueue에 옮기기
Minfo.forEach((x) => Mqueue.push(x));

for (let i = 0; i < W; i++) {
  // 만약 시간이 M의 cx와 같을 때, queue에 push
  if (Mqueue.front && Mqueue.front.value[2] === i) {
    const shifted = Mqueue.shift();
    queue.push(shifted);
  }

  // [1]과 [3] 비교. 같으면 shift
  if (queue.front.value[1] === queue.front.workedTime) queue.shift();

  // T와 [3] 비교. T와 같아지면 [3] = 0, 그리고 shift해서 push
  if (T === queue.front.workedTime) {
    queue.front.value[1] -= T;
    queue.front.workedTime = 0;
    const tempShifted = queue.shift();
    queue.push(tempShifted);
  }

  // 큐의 0번 요소[3]에 1플러스
  queue.front.workedTime++;

  // 큐의 0번 요소 확인. answer에 push
  answer.push(queue.front.value[0]);
}
console.log(answer.join("\n"));
