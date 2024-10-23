const [_, ...arr] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

class Stack {
  constructor() {
    this.arr = [];
  }

  push(item) {
    this.arr.push(item);
  }

  pop() {
    console.log(this.arr.pop() || -1);
  }

  size() {
    console.log(this.arr.length);
  }

  empty() {
    console.log(this.arr.length === 0 ? 1 : 0);
  }

  top() {
    console.log(this.arr.length != 0 ? this.arr.at(-1) : -1);
  }
}

const stack = new Stack();

arr.forEach((x) => {
  const action = x.split(" ");
  action[0] === "push" ? stack[action[0]](action[1]) : stack[action[0]]();
});
