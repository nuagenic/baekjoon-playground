// 1차 답안
/**
 * 모든 부 배열의 누적 합을 구한 뒤, (n이 1000이니까 가능)
 * sort하고,
 * A의 누적 합과 B의 누적 합 중 하나를 더해서 T가 나오는지 확인.
 */

let [T, n, A, m, B] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((x, idx) => (idx === 0 || idx === 1 || idx === 3 ? Number(x) : x));

A = A.split(" ").map(Number);
B = B.split(" ").map(Number);

// 누적합 구하기
let tempASum = 0;
let tempBSum = 0;

let prefixSumA = A.map((val) => (tempASum += val));
let prefixSumB = B.map((val) => (tempBSum += val));

let sumA = [];
let sumB = [];

prefixSumA.forEach((val, idx, arr) => {
  sumA.push(val);
  let i = 1;
  while (idx + i < arr.length) {
    sumA.push(arr[idx + i] - val);
    i++;
  }
});
prefixSumB.forEach((val, idx, arr) => {
  sumB.push(val);
  let i = 1;
  while (idx + i < arr.length) {
    sumB.push(arr[idx + i] - val);
    i++;
  }
});

sumA = sumA.sort((a, b) => a - b);
sumB = sumB.sort((a, b) => a - b);

// 투 포인터로 탐색
let count = 0;

let Apointer = 0;
let Bpointer = sumB.length - 1;

while (Apointer < sumA.length && Bpointer >= 0) {
  let valA = sumA[Apointer];
  let valB = sumB[Bpointer];
  let sum = valA + valB;
  if (sum === T) {
    let sameACount = 0;
    let sameBCount = 0;
    while (Apointer < sumA.length && valA === sumA[Apointer]) {
      Apointer++;
      sameACount++;
    }
    while (Bpointer < sumB.length && valB === sumB[Bpointer]) {
      Bpointer--;
      sameBCount++;
    }
    count += sameACount * sameBCount;
  } else if (sum > T) {
    Bpointer--;
  } else {
    Apointer++;
  }
}

console.log(count);
