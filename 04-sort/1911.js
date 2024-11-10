// 1차 답안
/**
 * 웅덩이를 정렬한다.
 * 1 6
 * 8 12
 * 13 17
 */

// 전처리
const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, L] = input[0].split(" ").map(Number);
let [_, ...arr] = input;
arr = arr.map((line) => line.split(" ").map(Number));
arr = arr.sort((a, b) => a[0] - b[0]);

let tempEnd = 0;
let answer = 0;
let length = 0;
let needed = 0;
arr.forEach(([start, end]) => {
  if (tempEnd < start) {
    length = end - start;
    needed = Math.ceil(length / L);
    answer += needed;
    tempEnd = start + L * needed - 1;
  } else {
    let newStart = tempEnd + 1;
    length = end - newStart;
    needed = Math.ceil(length / L);
    answer += needed;
    tempEnd = newStart + L * needed - 1;
  }
});

console.log(answer);
