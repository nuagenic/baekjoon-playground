const [NRQ, beltA, beltB, ...cmds] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

let [N, R, Q] = NRQ.split(" ").map(Number);
const mappedCmds = cmds.map((x) => x.split(" "));

// 1차 답안
/**
 * S: 1~R번째 칸까지 컨베이어끼리 사탕 교환
 * Lx: x번 컨베이어벨트 왼쪽으로 이동 -> 원형 리스트 생각
 * Rx: L의 반대
 * I: 집게 크기 1 증가
 * D: 집게 크기 1 감소
 */

// class Node {
//   constructor(value) {
//     this.value = value;
//     this.prev = null;
//     this.next = null;
//   }
// }

// class LinkedList {
//   constructor() {
//     this.head = null;
//     this.size = null;
//   }

//   push(value) {
//     const newNode = new Node(value);
//     if (!this.head) {
//       this.head = newNode;
//       newNode.next = newNode;
//       newNode.prev = newNode;
//     } else {
//       const tail = this.head.prev;
//       tail.next = newNode;
//       newNode.prev = tail;
//       newNode.next = this.head;
//       this.head.prev = newNode;
//     }
//     this.size++;
//   }

//   printList() {
//     if (!this.head) return;
//     let curr = this.head;
//     let result = [];
//     for (let i = 0; i < this.size; i++) {
//       result.push(curr.value);
//       curr = curr.next;
//     }
//     return result.join("");
//   }
// }

// const S = (listA, listB) => {
//   let currA = listA.head;
//   let currB = listB.head;

//   for (let i = 1; i <= R; i++) {
//     let temp = currA.value;
//     currA.value = currB.value;
//     currB.value = temp;
//     currA = currA.next;
//     currB = currB.next;
//   }
// };

// const Lx = (list) => {
//   let curr = list.head;
//   list.head = curr.next;
// };

// const Rx = (list) => {
//   let curr = list.head;
//   list.head = curr.prev;
// };

// const I = (R) => {
//   return R + 1;
// };

// const D = (R) => {
//   return R - 1;
// };

// // 원형 연결 리스트 만들기
// const listA = new LinkedList();
// const listB = new LinkedList();

// for (let char of beltA) {
//   listA.push(char);
// }
// for (let char of beltB) {
//   listB.push(char);
// }

// mappedCmds.forEach((x) => {
//   switch (x[0]) {
//     case "S":
//       S(listA, listB);
//       break;
//     case "L":
//       if (x[1] === "1") {
//         Lx(listA);
//       } else {
//         Lx(listB);
//       }
//       break;
//     case "R":
//       if (x[1] === "1") {
//         Rx(listA);
//       } else {
//         Rx(listB);
//       }
//       break;
//     case "I":
//       R = I(R);
//       break;
//     case "D":
//       R = D(R);
//       break;
//   }
// });

// // 출력
// console.log([listA.printList(), listB.printList()].join("\n"));

// 2차 답안
/**
 * 연결 리스트로 R개의 원소를 바꾸는 작업을 하니, 연산이 Q*R회가 되면서 시간초과 되는 경우가 발생했다.
 * 일반적인 배열로 구현하는 게 더 나을 수도 있겠다고 판단했다.
 */

let belt1 = beltA.split("");
let belt2 = beltB.split("");
let head1 = 0;
let head2 = 0;

const Lx = (belt, head) => (head + 1) % N;

const Rx = (belt, head) => (head - 1 + N) % N;

const S = (belt1, belt2, head1, head2, R) => {
  for (let i = 0; i < R; i++) {
    const idx1 = (head1 + i) % N;
    const idx2 = (head2 + i) % N;
    [belt1[idx1], belt2[idx2]] = [belt2[idx2], belt1[idx1]];
  }
};

for (let cmd of cmds) {
  let [operation, x] = cmd.split(" ");

  switch (operation) {
    case "S":
      S(belt1, belt2, head1, head2, R);
      break;
    case "L":
      if (x === "1") {
        head1 = Lx(belt1, head1);
      } else {
        head2 = Lx(belt2, head2);
      }
      break;
    case "R":
      if (x === "1") {
        head1 = Rx(belt1, head1);
      } else {
        head2 = Rx(belt2, head2);
      }
      break;
    case "I":
      R++;
      break;
    case "D":
      R--;
      break;
  }
}

// 결과 출력
const result1 = [];
const result2 = [];
for (let i = 0; i < N; i++) {
  result1.push(belt1[(head1 + i) % N]);
  result2.push(belt2[(head2 + i) % N]);
}

console.log(result1.join(""));
console.log(result2.join(""));
