// 1차 답안
/**
 * 엘사의 눈사람을 먼저 만든다고 하자. 최소 두 칸을 떨어뜨리고 숫자를 잡은 뒤,
 * 두 포인터 방식으로 사이를 탐색한다.
 * N이 최대 600이니 이중 for문을 사용하는 것도 가능하다.
 */
let [N, ...rest] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

N = Number(N);
let arr = rest[0].split(" ").map(Number);
arr = arr.sort((a, b) => a - b);

let elsa, left, right;
let answer = Number.MAX_SAFE_INTEGER;

outerLoop: for (let i = 0; i < N - 3; i++) {
  for (let j = i + 3; j < N; j++) {
    elsa = arr[i] + arr[j];
    left = i + 1;
    right = j - 1;

    while (left < right) {
      let temp = Math.abs(arr[left] + arr[right] - elsa);
      answer = Math.min(answer, temp);
      if (answer === 0) {
        break outerLoop;
      }
      arr[left] + arr[right] < elsa ? left++ : right--;
    }
  }
}

console.log(answer);
