// 1차 답안
/**
 * LIS 문제. 핵심은 길이를 구하는 것이니, 그 내부 과정에서 숫자가 뒤섞여도 상관 없다는 거.
 * 바로 전 index의 값보다 현재 값이 작을 경우에만, 현재 값보다 큰 값들 중 가작 작은 것으로 대체한다.
 */
let [N, arr] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
N = Number(N);
arr = arr.split(" ").map(Number);

const lis = [];

const binarySearch = (k, arr) => {
  let lo = 0;
  let hi = arr.length - 1;
  let mid;

  while (lo < hi) {
    mid = Math.floor(lo + (hi - lo) / 2);

    if (arr[mid] >= k) hi = mid;
    else lo = mid + 1;
  }
  return hi;
};

arr.forEach((num, idx) => {
  if (idx === 0) {
    lis.push(num);
  } else {
    if (num > lis[lis.length - 1]) {
      lis.push(num);
    } else if (num < lis[lis.length - 1]) {
      let replaceIdx = binarySearch(num, lis);
      lis[replaceIdx] = num;
    }
  }
});

console.log(lis.length);
