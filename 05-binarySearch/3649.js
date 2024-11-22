// 1차 답안
/**
 * 구멍의 너비 = x, 두 조각의 합 === x
 * 우선 첫째줄을 나노미터 단위로 환산
 * x보다 큰 것들을 filter 함.
 * 투 포인터로, x/2를 rootNode에 두고, left subtree와 right subtree를 탐색.
 */

let [x, n, ...rest] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

x = Number(x) * 10000000;
n = Number(n);
const arr = rest.map(Number).filter((l) => l < x); // x보다 큰 것은 미리 제외

const smaller = arr.filter((l) => l < x / 2).sort((a, b) => a - b);
const bigger = arr.filter((l) => l >= x / 2).sort((a, b) => b - a);

const solution = () => {
  for (let i = 0; i < smaller.length; i++) {
    let diff = x - smaller[i];
    for (let j = 0; j < bigger.length; j++) {
      if (bigger[j] === diff) return `yes ${smaller[i]} ${bigger[j]}`;
    }
  }
  // 답이 나오지 않았다면, 정확히 x/2가 2개 있는지 확인
  if (
    bigger[bigger.length - 1] === x / 2 &&
    bigger[bigger.length - 1] === bigger[bigger.length - 2]
  )
    return `yes ${bigger[bigger.length - 2]} ${bigger[bigger.length - 2]}`;

  return "danger";
};

console.log(solution());
