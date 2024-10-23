const [NM, stationsString, ...commandsString] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = NM.split(" ");
const stations = stationsString.split(" ");
const commands = commandsString.map((x) => x.split(" "));

// 1차 답안
/**
 * 다음 역과 이전 역에 대한 정보가 필요하기 때문에 양방향 원형 연결 리스트로 구현한다.
 * 우선 넣는 과정이 필요하다.
 */

// class Node {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//     this.prev = null;
//   }
// }

// class LinkedList {
//   constructor() {
//     this.head = null;
//     this.size = 0;
//   }

//   getNode(value) {
//     if (!this.head) return;
//     let curr = this.head;
//     for (let i = 0; i < this.size; i++) {
//       if (curr.value === value) return curr;
//       curr = curr.next;
//     }
//   }

//   insertAfter(i, j) {
//     const newNode = new Node(j);
//     let nextNode;
//     if (!i) {
//       newNode.next = newNode;
//       newNode.prev = newNode;
//       this.head = newNode;
//       nextNode = newNode;
//     } else {
//       const curr = this.getNode(i);
//       nextNode = curr.next;
//       nextNode.prev = newNode;
//       newNode.next = nextNode;
//       newNode.prev = curr;
//       curr.next = newNode;
//     }
//     this.size++;

//     return nextNode.value;
//   }

//   insertBefore(i, j) {
//     const newNode = new Node(j);
//     const curr = this.getNode(i);
//     const prevNode = curr.prev;
//     curr.prev = newNode;
//     newNode.next = curr;
//     newNode.prev = prevNode;
//     prevNode.next = newNode;
//     this.size++;

//     return prevNode.value;
//   }

//   deleteAfter(i) {
//     const curr = this.getNode(i);
//     const nextNode = curr.next;
//     const nextNextNode = nextNode.next;
//     curr.next = nextNextNode;
//     nextNextNode.prev = curr;
//     this.size--;

//     return nextNode.value;
//   }

//   deleteBefore(i) {
//     const curr = this.getNode(i);
//     const prevNode = curr.prev;
//     const prevPrevNode = prevNode.prev;
//     curr.prev = prevPrevNode;
//     prevPrevNode.next = curr;
//     this.size--;

//     return prevNode.value;
//   }
// }

// const linkedStations = new LinkedList();

// stations.forEach((x, i, arr) => {
//   linkedStations.insertAfter(i === 0 ? null : arr[i - 1], x);
// });

// let results = [];
// commands.forEach((x) => {
//   switch (x[0]) {
//     case "BN":
//       results.push(linkedStations.insertAfter(x[1], x[2]));
//       break;
//     case "BP":
//       results.push(linkedStations.insertBefore(x[1], x[2]));
//       break;
//     case "CN":
//       results.push(linkedStations.deleteAfter(x[1]));
//       break;
//     case "CP":
//       results.push(linkedStations.deleteBefore(x[1]));
//       break;
//   }
// });

// console.log(results.join("\n"));

// 2차 답안
/**
 * 위와 같은 답이 시간초과가 떴다. getNode(i)의 시간 복잡도가 O(n)이기 때문에,
 * 전체 연산이 O(n^2)의 시간 복잡도를 가지기 때문이라고 추정했다.
 * 따라서 특정 값을 찾는 호출을 해시 맵을 이용하여 최적화하고자 했다.
 * 또한 insertAfter과 달리 초기값을 넣는 연산은 push 메소드로 보다 더 간단하게 만들고자 했다.
 */

function printResult() {
  let curr = linkedStations.head;
  let result = [];
  for (let i = 0; i < linkedStations.size; i++) {
    result.push(curr.value);
    curr = curr.next;
  }
  console.log(result);
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
    this.nodeMap = new Map();
  }

  getNode(value) {
    return this.nodeMap.get(value);
  }

  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
    } else {
      const prevNode = this.head.prev;
      prevNode.next = newNode;
      newNode.prev = prevNode;
      newNode.next = this.head;
      this.head.prev = newNode;
    }
    this.size++;
    this.nodeMap.set(value, newNode);
  }

  insertAfter(i, j) {
    const newNode = new Node(j);
    const curr = this.getNode(i);
    const nextNode = curr.next;
    nextNode.prev = newNode;
    newNode.next = nextNode;
    newNode.prev = curr;
    curr.next = newNode;

    this.size++;
    this.nodeMap.set(j, newNode);

    return nextNode.value;
  }

  insertBefore(i, j) {
    const newNode = new Node(j);
    const curr = this.getNode(i);
    const prevNode = curr.prev;
    curr.prev = newNode;
    newNode.next = curr;
    newNode.prev = prevNode;
    prevNode.next = newNode;

    this.size++;
    this.nodeMap.set(j, newNode);

    return prevNode.value;
  }

  deleteAfter(i) {
    const curr = this.getNode(i);
    const nextNode = curr.next;
    const nextNextNode = nextNode.next;
    curr.next = nextNextNode;
    nextNextNode.prev = curr;
    this.nodeMap.delete(nextNode.value);
    this.size--;

    return nextNode.value;
  }

  deleteBefore(i) {
    const curr = this.getNode(i);
    const prevNode = curr.prev;
    const prevPrevNode = prevNode.prev;
    curr.prev = prevPrevNode;
    prevPrevNode.next = curr;
    this.nodeMap.delete(prevNode.value);
    this.size--;

    return prevNode.value;
  }
}

const linkedStations = new LinkedList();

stations.forEach((x) => {
  linkedStations.push(x);
});

let results = [];
commands.forEach((x) => {
  switch (x[0]) {
    case "BN":
      results.push(linkedStations.insertAfter(x[1], x[2]));
      break;
    case "BP":
      results.push(linkedStations.insertBefore(x[1], x[2]));
      break;
    case "CN":
      results.push(linkedStations.deleteAfter(x[1]));
      break;
    case "CP":
      results.push(linkedStations.deleteBefore(x[1]));
      break;
  }
});

console.log(results.join("\n"));
