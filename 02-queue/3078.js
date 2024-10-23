const [NK, ...students] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
const [N, K] = NK.split(" ").map(Number);

// 1차 답안
/**
 * N은 학생 수, K는 성적 차이 threshold.
 * 학생 이름 성적순
 * 우선 자신과 이름의 길이가 같아야 하고, 성적 차이가 K 이하여야 한다.
 * 배열의 요소별로 순회하며, index~K인 리스트를 하나 만든다. (중복 생략하기 위함)
 * 거기에서 자신의 이름과 길이가 같은 게 있으면 count를 1씩 더한다.
 */

// let count = 0;
// students.forEach((val, idx, arr) => {
//   const length = val.length;
//   const target = arr.slice(
//     idx,
//     idx + K + 1 > arr.length ? arr.length : idx + K + 1
//   );
//   console.log(target);
//   target.forEach((x) => {
//     if (x.length === length && val != x) count++;
//   });
// });

// console.log(count);

// 2차 답안
/**
 * 당연하지만, for문을 N * (N-K)회 돌리니 시간 초과가 발생한다.
 * 서치 결과 슬라이딩 윈도우가 있었고, 글자 수가 제한이 있으니 이를 윈도우 개념으로 만들어 보라는 얘기가 있었다.
 *
 */
let answer = 0;

const studentsLength = students.map((x, idx) => {
  return [x.length, idx];
});

const mapByLetters = new Map(); // {2: [1, 2, 5], 3: [3, 4]...}

studentsLength.forEach((val) => {
  const [length, rank] = val;
  if (!mapByLetters.has(length)) {
    mapByLetters.set(length, [rank]);
  } else {
    mapByLetters.get(length).push(rank);
  }
});
console.log(mapByLetters);
mapByLetters.forEach((val) => {
  let i = 0;
  if (val.length < 2) return;

  // 해당 array에서 길이가 2인 슬라이딩 윈도우를 고려해보자.
  while (i < val.length - 1) {
    if (val[i + 1] - val[i] <= K) answer++;
    i++;
  }
});

console.log(answer);
