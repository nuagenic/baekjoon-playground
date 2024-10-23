let fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split("\n");

// 1차 답변
/**
 * 1. 막대기 배열의 마지막 요소를 꺼낸 후, 그 comparedBlocks과 비교한다.
 * 2. comparedBlock보다 해당 요소가 작거나 같으면 순회를 계속한다.
 * 3. comparedBlock보다 해당 요소가 크다면 배열에서 꺼내여 comparedBlocks에 값을 넣는다.
 */

const numInput = input.map((x) => Number(x));
const [count, ...blocks] = numInput;
let comparedBlock = 0;
const answer = [];

for (let i = count - 1; i >= 0; i--) {
  const currentBlock = blocks[i];
  if (currentBlock > comparedBlock) {
    answer.push(currentBlock);
    comparedBlock = currentBlock;
  }
}

console.log(answer.length);
