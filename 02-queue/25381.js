const str = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("");

// 1차 답안
/**
 * 해당 문자열을 스택에 넣고,
 * 스택을 하나 만들어 쓰이지 않은 알파벳을 넣어둘 공간을 마련.
 * (그러려고 했으나, 중간에 삭제해야 한다는 점에서 연결리스트도 고려)
 * B나 A가 나오면, 뒤에 해당하는 게 있는 방식으로 진행.
 * 그런데 A가 나왔을 때, B가 없다면 굳이 가지고 있을 필요가 없을 것이다.
 */

// const L = stack.length;
// let temp = [];
// let temp2 = [];
// let count = 0;

// for (let i = 0; i < L; i++) {
//   const popped = stack.pop();
//   switch (popped) {
//     case "C":
//       temp.push(popped);
//       break;
//     case "B": // temp를 탐색하며 C가 있는지 확인, 없으면 push
//       let solvedB = false;

//       while (!solvedB) {
//         if (temp.length > 0) {
//           const poppedFromTemp = temp.pop();
//           if (poppedFromTemp === "C") {
//             count++;
//             solvedB = true;
//           } else {
//             temp2.push(poppedFromTemp);
//           }
//         } else {
//           temp.push(popped);
//           solvedB = true;
//         }
//       }
//       temp = temp.concat(temp2);
//       temp2 = [];
//       break;
//     case "A": // temp를 탐색하여 B가 있는지 확인 (A는 절대 push하지 않음)
//       let solvedA = false;

//       while (!solvedA) {
//         if (temp.length > 0) {
//           const poppedFromTemp = temp.pop();
//           if (poppedFromTemp === "B") {
//             count++;
//             solvedA = true;
//           } else {
//             temp2.push(poppedFromTemp);
//           }
//         } else {
//           solvedA = true;
//         }
//       }
//       temp = temp.concat(temp2);
//       temp2 = [];

//       break;
//   }
// }

// console.log(count);

// 2차 답안
/**
 * 내 알고리즘으로는 BAABBC 다음과 같은 식을 잡아낼 수 없음
 * 그리디 알고리즘을 사용할 수 있다는 포스트를 확인했다. AB생성 개수와 BC생성 개수를 확인하고, 이를 B의 갯수와 비교하면 된다는 것
 */

// const countChar = (arr, char) => {
//   return arr.reduce((count, x) => count + (x === char ? 1 : 0), 0);
// };

// // // AB를 세는 법: 첫 A가 나오는 기준으로, 그 뒤에 B가 몇 개인지 센다. min(Acount, Bcount)
// // // BC를 세는 법: 첫 B가 나오는 기준으로, 그 뒤에 C가 몇 개인지 센다. min(Bcount, Count)
// const countPairs = (arr, char1, char2) => {
//   // char1가 나오는 첫 인덱스 찾기
//   const index = arr.findIndex((e) => e === char1);
//   if (index === -1) return 0;

//   const slicedArr = arr.slice(index);
//   // slicedArr에서 char2가 나오는 lastIndex를 찾고, 그 이후에 있는 char1의 개수만큼 숫자를 빼야 함.
//   const lastIndexOfChar2 = slicedArr.findLastIndex((e) => e === char2);
//   if (lastIndexOfChar2 <= 0) return 0;

//   const slicedArr2 = slicedArr.slice(lastIndexOfChar2);
//   const remainderCount = countChar(slicedArr2, char1);
//   const char1Count = countChar(arr, char1) - remainderCount;
//   const char2Count = countChar(slicedArr, char2);

//   return Math.min(char1Count, char2Count);
// };
// const ABBC = countPairs(str, "A", "B") + countPairs(str, "B", "C");
// const B = countChar(str, "B");

// console.log(Math.min(ABBC, B));

// 3차 답안
/**
 * 사실 2차 답안이 왜 틀린지 아직 잘 모르겠다..
 * 3차 답안과 로직은 같은데, 왜 그렇지
 * 알았다. countPairs의 경우, 마지막에 A가 오는 경우를 고려하지 않았던 것.
 * 취소.... 콘솔에서는 처리가 되는데 백준에서 처리가 안 됨
 */
let answer = 0;
let Acount = 0;
let Bcount = 0;
let Btotal = 0;

for (let i = 0; i < str.length; i++) {
  if (str[i] === "A") {
    Acount++;
  } else if (str[i] === "B" && Acount > 0) {
    Acount--;
    answer++;
  }
}

for (let i = 0; i < str.length; i++) {
  if (str[i] === "B") {
    Bcount++;
    Btotal++;
  } else if (str[i] === "C" && Bcount > 0) {
    Bcount--;
    answer++;
  }
}

console.log(Math.min(answer, Btotal));
