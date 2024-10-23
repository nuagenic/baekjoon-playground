// 1차 답안
/**
 * N명 중 체력 > 0 인 플레이어 생존
 * 자신의 체력 > 0 -> 자신 제외 모든 플레이어 체력을 공격력만큼 감소
 * 자신의 체력 <= 0 -> 행동 하지 않고 턴 넘김
 */
// let [N, d, h] = require("fs")
//   .readFileSync("./input.txt")
//   .toString()
//   .trim()
//   .split("\n");
// N = Number(N);
// const attacks = d.split(" ").map(Number);
// const hps = h.split(" ").map(Number);
// const playerMap = new Map();
// for (let i = 0; i < N; i++) {
//   playerMap.set(i + 1, { d: attacks[i], h: hps[i] });
// }

// const battle = (N, attacks, hps) => {
//   let leftPlayer = N;
//   let isAlive = Array(N).fill(true);

//   let currentPlayer = 0;

//   // 한명이 살아남을 때까지 진행
//   while (leftPlayer > 1) {
//     if (hps[currentPlayer] > 0) {
//       for (let i = 0; i < N; i++) {
//         if (i !== currentPlayer && isAlive[i]) {
//           hps[i] -= attacks[currentPlayer];
//           if (hps[i] <= 0) {
//             isAlive[i] = false;
//             leftPlayer--;
//           }
//         }
//       }
//     }

//     currentPlayer = (currentPlayer + 1) % N;
//   }

//   for (let i = 0; i < N; i++) {
//     if (isAlive[i]) {
//       return i + 1;
//     }
//   }
// };

// console.log(battle(N, attacks, hps));

// 2차 답안
/**
 * 역시나 시간초과
 */
let [N, d, h] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
N = Number(N);
const attacks = d.split(" ").map(Number);
const hps = h.split(" ").map(Number);

const battle = (N, attacks, hps) => {
  //   let totalDamage = 0;
  let alivePlayers = new Set();

  for (let i = 0; i < N; i++) {
    alivePlayers.add(i);
  }
  let currentPlayer = 0;

  // 한명이 살아남을 때까지 진행
  while (alivePlayers.size > 1) {
    if (alivePlayers.has(currentPlayer)) {
      //   totalDamage += attacks[currentPlayer];

      for (let i of alivePlayers) {
        if (i !== currentPlayer) {
          hps[i] -= attacks[currentPlayer];
          if (hps[i] <= 0) {
            alivePlayers.delete(i);
          }
        }
      }
    }
    currentPlayer = (currentPlayer + 1) % N;
  }

  return Array.from(alivePlayers)[0] + 1;
};

console.log(battle(N, attacks, hps));
