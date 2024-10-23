const [N, K, ...rest] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

let apples = rest.slice(0, K);
let [L, ...directions] = rest.slice(K);
// apples = apples.map((x) => x.split(" ").map(Number)); // [[3,4], [2,5], [5,3]]
apples = new Set(apples.map((x) => x.split(" ").map(Number).join(",")));
directions = directions.reverse().map((x) =>
  x.split(" ").map((x, i) => {
    return i === 0 ? Number(x) : x;
  })
); // [ [ 17, 'D' ], [ 15, 'L' ], [ 3, 'D' ] ]

// 1차 답안
/**
 * 뱀의 자료구조는 삽입과 삭제의 위치가 다르기 때문에 큐로 생각하면 좋을 것이다.
 * 몸길이 늘려 머리를 다음칸에 위치 -> 머리에 삽입 (이때 push)
 * 벽/자신 몸에 부딪히면 게임 끝남 -> 삽입하기 전 조건문으로 확인
 * 이동한 칸에 사과 -> 사과가 있는지 확인하고, 있으면 사과를 없애는 함수 만든다. 사과는 해시 테이블
 * 이동한 칸에 사과 없다면 -> 꼬리 삭제 (shift)
 */
/**
 *
 */

let seconds = 0;
let snake = [[1, 1]];
let currentRow = 1;
let currentCol = 1;
let isRowDirection = true; // 가로 방향, 세로 방향 구분
let isPositive = true; // 음양 방향성 확인

function directionChange(cmd) {
  if (cmd === "L") {
    isPositive = isRowDirection ? !isPositive : isPositive;
  } else {
    isPositive = isRowDirection ? isPositive : !isPositive;
  }
  isRowDirection = !isRowDirection;
}

function move() {
  if (isRowDirection) {
    isPositive ? currentCol++ : currentCol--;
  } else {
    isPositive ? currentRow++ : currentRow--;
  }

  // 충돌 확인
  if (
    currentRow < 1 ||
    currentRow > N ||
    currentCol < 1 ||
    currentCol > N ||
    snake.some((pos) => pos[0] === currentRow && pos[1] === currentCol)
  ) {
    return false; // 게임 종료
  }

  snake.push([currentRow, currentCol]); // 새로운 좌표로 머리 이동

  // 사과가 있으면 사과 제거, 없으면 꼬리 삭제
  const appleKey = `${currentRow},${currentCol}`;
  if (apples.has(appleKey)) {
    apples.delete(appleKey);
  } else {
    snake.shift();
  }

  seconds++; // 초 증가

  // 방향 전환이 있는지 확인 후 방향 조정
  if (
    directions.length > 0 &&
    seconds === directions[directions.length - 1][0]
  ) {
    let poppedCmd = directions.pop();
    directionChange(poppedCmd[1]);
  }

  return true;
}

while (move()) {}

console.log(seconds + 1);
