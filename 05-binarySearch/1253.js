// 1차 답안
/**
 * -3 -2 -1 0 3 5 7
 * 그 숫자를 뺀 뒤 투포인터로 찾는다
 */
let [N, ...rest] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

N = Number(N);
const arr = rest[0]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const answer = [];

arr.forEach((num, idx) => {
  const arrWithoutNum = arr.slice(0, idx).concat(arr.slice(idx + 1));
  let startIdx = 0;
  let endIdx = arrWithoutNum.length - 1;
  let good = false;

  while (startIdx < endIdx) {
    let tempSum = arrWithoutNum[startIdx] + arrWithoutNum[endIdx];
    if (tempSum === num) {
      good = true;
      break;
    } else if (tempSum > num) {
      endIdx--;
    } else {
      startIdx++;
    }
  }

  good && answer.push(num);
});

console.log(answer.length);
