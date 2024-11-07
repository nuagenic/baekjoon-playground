// 1차 답안
/**
 * 1. arr를 정렬한다.
 * 2. 양수와 음수로 나누고, 각각의 0번째 index에 포인터를 둔다.
 * 3. 둘 중 절댓값이 큰 쪽이 '이긴' 것이다.
 *  3-1. '진' 쪽에서 하나를 더해야 0에 가까워질 것이다.
 *  3-2. 만약 '이긴 쪽' / 2 > '진' 쪽일 경우, '진' 기준 왼쪽부터 탐색한다.
 *  3-3. 반대일 경우, '진' 기준 오른쪽부터 탐색한다.
 *  3-4. 최종 후보를 후보에 넣는다. (Map 형태)
 * 4. '진' 쪽에서 포인터를 하나 오른쪽으로 밀고, 3을 반복한다.
 * 5. 포인터가 끝까지 갈 때까지 한다.. 그런데 만약 '진'을 더 이상 움직일 수 없을 경우 끝낸다.
 */
let [N, line] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
N = Number(N);
let arr = line.split(" ").map(Number);

function solution() {
  let sum = null;
  let answer = [];

  // arr 정렬 및 양/음으로 분리
  arr = arr.sort((a, b) => a - b);
  // 최초로 양수가 나오는 index 탐색
  let posIndex = 0;
  while (true) {
    if (arr[posIndex] > 0) break;
    posIndex++;
    if (posIndex === arr.length) break; // 양수가 없는 경우
  }
  const neg = arr.slice(0, posIndex).reverse();
  const pos = arr.slice(posIndex);

  // neg나 pos 한쪽이 없을 경우 끝냄
  if (!neg.length) return pos.slice(0, 3).join(" ");
  if (!pos.length) return neg.slice(0, 3).reverse().join(" ");

  // pointer를 0번째 index부터 시작.
  let posPtr = 0;
  let negPtr = 0;
  let thirdPtr = 0;
  let posVal,
    negVal,
    diff,
    winVal,
    loseVal,
    winPtr,
    losePtr,
    loseLength,
    win,
    lose;

  while (posPtr < pos.length && negPtr < neg.length) {
    posVal = pos[posPtr];
    negVal = neg[negPtr];

    diff = posVal - Math.abs(negVal);

    winVal = diff >= 0 ? posVal : negVal;
    [loseVal, winPtr, losePtr, loseLength, win, lose] =
      winVal === posVal
        ? [negVal, posPtr, negPtr, neg.length, pos, neg]
        : [posVal, negPtr, posPtr, pos.length, neg, pos];

    if (Math.abs(winVal) / 2 > Math.abs(loseVal)) {
      for (let i = losePtr + 1; i < loseLength; i++) {
        thirdPtr = i;
        if (Math.abs(lose[thirdPtr]) > Math.abs(diff)) break;
      }

      thirdPtr =
        Math.abs(lose[thirdPtr]) - Math.abs(diff) <=
          Math.abs(lose[thirdPtr - 1]) - Math.abs(diff) ||
        thirdPtr === losePtr + 1
          ? thirdPtr
          : thirdPtr - 1;
    } else if (Math.abs(winVal) / 2 < Math.abs(loseVal)) {
      for (let i = 0; i < losePtr; i++) {
        thirdPtr = i;
        if (Math.abs(lose[thirdPtr]) > Math.abs(diff)) break;
      }
      thirdPtr =
        Math.abs(lose[thirdPtr]) - Math.abs(diff) <=
          Math.abs(lose[thirdPtr - 1]) - Math.abs(diff) || thirdPtr === 0
          ? thirdPtr
          : thirdPtr - 1;
    } else {
      thirdPtr =
        Math.abs(lose[losePtr - 1]) - Math.abs(diff) <=
        Math.abs(lose[losePtr + 1]) - Math.abs(diff)
          ? losePtr - 1
          : losePtr + 1;
    }

    if (
      sum === null ||
      Math.abs(win[winPtr] + lose[losePtr] + lose[thirdPtr]) < sum
    ) {
      sum = Math.abs(win[winPtr] + lose[losePtr] + lose[thirdPtr]);

      answer = [win[winPtr], lose[losePtr], lose[thirdPtr]]
        .sort((a, b) => a - b)
        .join(" ");
    }

    lose === neg ? negPtr++ : posPtr++;
  }
  if (Math.abs(pos[0] + pos[1] + pos[2]) < sum)
    return pos.slice(0, 3).join(" ");
  if (Math.abs(neg[0] + neg[1] + neg[2]) < sum)
    return neg.slice(0, 3).reverse().join(" ");
  return answer;
}

console.log(solution());
