const [_, ...commands] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const arr = commands.map((command) => {
  const firstFour = command.slice(0, 4);
  if (firstFour === "free") {
    return ["free", command.slice(5, 9)];
  } else if (firstFour === "prin") {
    return ["print", command.slice(6, 10)];
  } else {
    return ["malloc", firstFour, command.slice(12, -2)];
  }
});

const memory = new Array(100000);
const curr = 0;

const malloc = (chars, length) => {
  while (memory[curr]) {
    curr++;
  }
};

const free = () => {};

const print = () => {};
