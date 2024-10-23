const [count, ...keys] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// 1차 답안
// 삽입 및 삭제가 많이 일어나기 때문에 연결 리스트로 구현한다.
// 양방향 연결 리스트로 구현해보자.

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LinkedList {
  constructor() {
    this.head = new Node(null);
    this.size = null;
    this.pointer = this.head;
  }

  shiftLeft() {
    if (this.pointer.prev) {
      this.pointer = this.pointer.prev;
    }
  }

  shiftRight() {
    if (this.pointer.next) {
      this.pointer = this.pointer.next;
    }
  }

  deleteBefore() {
    if (this.pointer.prev) {
      const prevNode = this.pointer.prev;
      if (this.pointer.next) {
        const nextNode = this.pointer.next;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        this.pointer = prevNode;
      } else {
        prevNode.next = null;
        this.pointer = prevNode;
      }
    }
  }

  insertAfter(item) {
    const newNode = new Node(item);
    if (this.pointer.next) {
      const nextNode = this.pointer.next;

      newNode.next = nextNode;
      nextNode.prev = newNode;
      newNode.prev = this.pointer;
      this.pointer.next = newNode;

      this.pointer = newNode;
    } else {
      this.pointer.next = newNode;
      newNode.prev = this.pointer;
      this.pointer = this.pointer.next;
    }
  }
}

keys.forEach((x) => {
  const linkedList = new LinkedList();
  for (let i = 0; i < x.length; i++) {
    switch (x[i]) {
      case "<":
        // curr가 prev를 가리키게 함.
        linkedList.shiftLeft();
        break;
      case ">":
        // curr가 next를 가리키게 함.
        linkedList.shiftRight();
        break;
      case "-":
        // curr가 가리키는 노드를 삭제함.
        linkedList.deleteBefore();
        break;
      default:
        // curr가 가리키는 노드 다음 자리에 삽입함.
        linkedList.insertAfter(x[i]);
        break;
    }
  }
  console.log(printLinkedList(linkedList));
});

function printLinkedList(list) {
  let result = "";
  let current = list.head.next;
  while (current) {
    result += current.value;
    current = current.next;
  }
  return result;
}
