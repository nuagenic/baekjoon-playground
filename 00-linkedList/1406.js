const [strings, M, ...commands] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// 1차 답안
/**
 * 데이터의 추가 및 삭제가 빈번하게 일어나고,
 * 커서를 current로 표현할 수 있으니 연결리스트가 적합할 것.
 * 그렇게 하려고 했는데 생각보다 구현이 빡세서 배열로 대체... 연결리스트 작업을 찾아볼 것.
 */

const arr = strings.split("");
const mappedCommands = commands.map((x) => x.split(" "));

// let currIdx = arr.length; // 커서는 현재 대상이 되는 idx - 1로 한다. 즉, 0과 1 사이에 있으면 1이다.
// let size = arr.size;

// function L() {
//   if (currIdx <= 0) return;
//   currIdx--;
// }

// function D() {
//   if (currIdx >= size) return;
//   currIdx++;
// }

// function B(strings) {
//   if (currIdx <= 0) return;
//   strings = strings.splice(currIdx - 1, 1);
//   currIdx--;
// }

// function P(strings, item) {
//   strings = strings.splice(currIdx, 0, item);
//   currIdx++;
// }

// const mappedCommands = commands.map((x) => x.split(" "));

// mappedCommands.forEach((x) => {
//   switch (x[0]) {
//     case "L":
//       L();
//       break;
//     case "D":
//       D();
//       break;
//     case "B":
//       B(arr);
//       break;
//     case "P":
//       P(arr, x[1]);
//       break;
//   }
// });

// console.log(arr.join(""));

// 2차 답안
/**
 * 시간 초과 이슈로 배열 리스트를 사용하는 것이 어렵게 되었다.
 * 삽입/삭제의 경우 배열은 O(n)의 시간복잡도를 가지는 반면 연결리스트는 O(1)을 쓰기 때문에 이를 사용해야 할 것이다.
 * 물론 커서를 기준으로 왼쪽 오른쪽에 스택을 두는 것도 가능할 것이다.
 */
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

function insertAfter(node, value) {
  const newNode = new Node(value);
  newNode.prev = node;
  newNode.next = node.next;
  if (node.next) {
    node.next.prev = newNode;
  }
  node.next = newNode;

  return newNode;
}

function deleteNode(node) {
  const prevNode = node.prev;
  const nextNode = node.next;
  if (prevNode) {
    prevNode.next = nextNode;
  }
  if (nextNode) {
    nextNode.prev = prevNode;
  }
}

const head = new Node(null);
let cursor = head;

for (let i = 0; i < strings.length; i++) {
  cursor = insertAfter(cursor, strings[i]);
}

mappedCommands.forEach((x) => {
  switch (x[0]) {
    case "L":
      if (cursor.prev) {
        cursor = cursor.prev;
      }
      break;
    case "D":
      if (cursor.next) {
        cursor = cursor.next;
      }
      break;
    case "P":
      cursor = insertAfter(cursor, x[1]);
      break;
    case "B":
      if (cursor.prev) {
        const prevNode = cursor.prev;
        deleteNode(cursor);
        cursor = prevNode;
      }
  }
});

let result = "";
cursor = head.next;
while (cursor) {
  result += cursor.value;
  cursor = cursor.next;
}

console.log(result);
