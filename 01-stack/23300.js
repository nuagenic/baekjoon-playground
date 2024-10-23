const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
const [NQ, ...arr] = input;
const [N, Q] = NQ.split(" ").map(Number);

const mappedArr = arr.map((x) => x.split(" "));

class Browser {
  constructor() {
    this.backStack = [];
    this.frontStack = [];
    this.curr = -1;
  }

  B() {
    if (this.backStack.length > 0) {
      this.frontStack.push(this.curr);
      this.curr = this.backStack.pop();
    }
  }

  F() {
    if (this.frontStack.length > 0) {
      this.backStack.push(this.curr);
      this.curr = this.frontStack.pop();
    }
  }

  A(site) {
    this.frontStack = [];
    if (this.curr > 0) this.backStack.push(this.curr);
    this.curr = site;
  }

  C() {
    this.backStack = this.backStack.filter(
      (val, idx, arr) => idx === 0 || val !== arr[idx - 1]
    );
  }
}
const browser = new Browser();

mappedArr.forEach((x) => {
  switch (x[0]) {
    case "A":
      browser.A(x[1]);
      break;
    case "B":
      browser.B();
      break;
    case "F":
      browser.F();
      break;
    case "C":
      browser.C();
      break;
  }
});

console.log(browser.curr);
console.log(
  browser.backStack.length ? browser.backStack.reverse().join(" ") : -1
);
console.log(
  browser.frontStack.length ? browser.frontStack.reverse().join(" ") : -1
);
