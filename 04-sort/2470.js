// 1차 답안
/**
 * 1. 음수와 양수로 나누고 정렬
 * 2. 음수부터 양수 하나씩 넣으면서 확인
 * 3. 양수[0]+양수[1], 음수[0]+음수[1], 그리고 2번의 값과 비교
 */
// let [N, line] = require("fs")
//   .readFileSync("./input.txt")
//   .toString()
//   .trim()
//   .split("\n");
// N = Number(N);
// let arr = line.split(" ").map(Number);

// function solution() {
//   let answer = [];

//   // arr 정렬 및 양/음으로 분리
//   arr = arr.sort((a, b) => a - b);

//   // 최초로 양수가 나오는 index 탐색
//   let posIndex = 0;
//   while (true) {
//     if (arr[posIndex] > 0) break;
//     posIndex++;
//     if (posIndex === arr.length) break; // 양수가 없는 경우
//   }
//   const neg = arr.slice(0, posIndex).reverse();
//   const pos = arr.slice(posIndex);

//   // neg나 pos 한쪽이 없을 경우 끝냄
//   if (!neg.length) return pos.slice(0, 2).join(" ");
//   if (!pos.length) return neg.slice(0, 2).reverse().join(" ");

//   let [answerNeg, answerPos] = [null, null];

//   neg.forEach((negNum) => {
//     pos.forEach((posNum) => {
//       if (
//         Math.abs(negNum + posNum) < Math.abs(answerNeg + answerPos) ||
//         !answerNeg
//       )
//         [answerNeg, answerPos] = [negNum, posNum];
//     });
//   });

//   let toCompare = null;
//   if (pos[0] + pos[1] <= Math.abs(neg[0] + neg[1]) || !(neg[0] + neg[1]))
//     toCompare = pos[0] + pos[1];
//   if (Math.abs(neg[0] + neg[1]) < pos[0] + pos[1] || !(pos[0] + pos[1]))
//     toCompare = neg[0] + neg[1];

//   if (toCompare) {
//     if (Math.abs(answerNeg + answerPos) > pos[0] + pos[1])
//       return pos.slice(0, 2).join(" ");
//     if (Math.abs(answerNeg + answerPos) > Math.abs(neg[0] + neg[1]))
//       return neg.slice(0, 2).reverse().join(" ");
//   }
//   return `${answerNeg} ${answerPos}`;
// }

// console.log(solution());

// 2차 답안
/**
 * 시간 초과가 발생. 중복 forEach 때문일 것.
 *
 */
// let [N, line] = require("fs")
//   .readFileSync("./input.txt")
//   .toString()
//   .trim()
//   .split("\n");
// N = Number(N);
// let arr = line.split(" ").map(Number);

// function solution() {
//   let answer = [];

//   // arr 정렬 및 양/음으로 분리
//   arr = arr.sort((a, b) => a - b);

//   // 최초로 양수가 나오는 index 탐색
//   let posIndex = 0;
//   while (true) {
//     if (arr[posIndex] > 0) break;
//     posIndex++;
//     if (posIndex === arr.length) break; // 양수가 없는 경우
//   }
//   const neg = arr.slice(0, posIndex).reverse();
//   const pos = arr.slice(posIndex);

//   // neg나 pos 한쪽이 없을 경우 끝냄
//   if (!neg.length) return pos.slice(0, 2).join(" ");
//   if (!pos.length) return neg.slice(0, 2).reverse().join(" ");

//   let [answerNeg, answerPos] = [null, null];

//   neg.forEach((negNum) => {
//     let diffPoint = null;
//     for (let i = 0; i < pos.length; i++) {
//       if (negNum + pos[i] > 0) {
//         diffPoint = i;
//         break;
//       }
//     }
//     if (diffPoint === 0) {
//       if (
//         Math.abs(negNum + pos[0]) < Math.abs(answerNeg + answerPos) ||
//         !answerNeg
//       )
//         [answerNeg, answerPos] = [negNum, pos[0]];
//     } else if (diffPoint === null) {
//       if (
//         Math.abs(negNum + pos[pos.length - 1]) <
//           Math.abs(answerNeg + answerPos) ||
//         !answerNeg
//       )
//         [answerNeg, answerPos] = [negNum, pos[pos.length - 1]];
//     } else {
//       let [nominee1, nominee2] = [pos[diffPoint], pos[diffPoint - 1]];
//       let winner =
//         Math.abs(negNum + nominee1) <= Math.abs(negNum + nominee2)
//           ? nominee1
//           : nominee2;
//       if (
//         Math.abs(negNum + winner) < Math.abs(answerNeg + answerPos) ||
//         !answerNeg
//       )
//         [answerNeg, answerPos] = [negNum, winner];
//     }
//   });

//   let toCompare = null;
//   if (pos[0] + pos[1] <= Math.abs(neg[0] + neg[1]) || !(neg[0] + neg[1]))
//     toCompare = pos[0] + pos[1];
//   if (Math.abs(neg[0] + neg[1]) < pos[0] + pos[1] || !(pos[0] + pos[1]))
//     toCompare = neg[0] + neg[1];

//   if (toCompare) {
//     if (Math.abs(answerNeg + answerPos) > pos[0] + pos[1])
//       return pos.slice(0, 2).join(" ");
//     if (Math.abs(answerNeg + answerPos) > Math.abs(neg[0] + neg[1]))
//       return neg.slice(0, 2).reverse().join(" ");
//   }
//   return `${answerNeg} ${answerPos}`;
// }

// console.log(solution());

// 3차 답안
/**
 * 역시나 시간 초과에 걸렸다.
 * 검색을 해보니 투 포인터를 써야 하는 문제로 보인다.
 */
let [N, line] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
N = Number(N);
let arr = line.split(" ").map(Number);
arr = arr.sort((a, b) => a - b);

function solution() {
  let left = 0;
  let right = N - 1;
  let temp = Number.MAX_SAFE_INTEGER;
  let answer = [];

  while (left < right) {
    let sum = arr[left] + arr[right];

    if (Math.abs(sum) < temp) {
      temp = Math.abs(sum);
      answer = [arr[left], arr[right]];
    }

    sum < 0 ? left++ : right--;
  }
  return answer.join(" ");
}

console.log(solution());
