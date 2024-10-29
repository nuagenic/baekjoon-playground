const [N, ...rest] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const arr = rest.map((x) => x.split(" ").map(Number));

// 1차 답안
/**
 * N이 최대 20만이기 때문에 반복문을 돌리는 건 사실상 어렵다.
 * 결국 최대로 쓰이는 강의실만 구하면 되니, 가장 많이 겹칠 때를 판단하는 알고리즘을 구현해보자.
 * 그런데 시간별로 훑을 수는 없다. 끝나는 시간이 10^9나 되기 때문에.
 * 우선 arr을 정렬해야겠다는 생각이 든다.
 */

const newArr = arr
  .map((x) => {
    return [
      [x[0], 1],
      [x[1], -1],
    ];
  })
  .flat();

newArr.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

let max = 0;
let cur = 0;
newArr.forEach((x) => {
  x[1] === 1 ? cur++ : cur--;
  max = max < cur ? cur : max;
});
console.log(max);
