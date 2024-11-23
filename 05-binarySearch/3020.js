// 1차 답안
/**
 * 동굴의 높이를 층 수라고 하자.
 * 1층은 석순 >= 1, 종유석 >= H,
 * 2층은 석순 >= 2, 종유석 >= H - 1,
 * 3층은 석순 >= 3, 종유석 >= H - 2,
 * H층은 석순 >= H, 종유석 >= 1
 * 즉 석순과 종유석의 길이별 count map을 만들고,
 * 석순에서 한 개를 빼고 종유석에서 하나를 더해가는 방식으로 min을 찾는다.
 */
let [NH, ...rest] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, H] = NH.split(" ").map(Number);
const arr = rest.map(Number);
const SS = [];
const JWS = [];

const SScount = new Array(H - 1).fill(0); // len이 1, 2, ..., H-1
const JWScount = new Array(H - 1).fill(0);

arr.forEach((x, idx) => {
  if (idx % 2 === 0) {
    SS.push(x);
    SScount[x - 1]++;
  } else {
    JWS.push(x);
    JWScount[x - 1]++;
  }
});

let SScurr = N / 2;
let JWScurr = 0;

let min = Number.MAX_SAFE_INTEGER;
let minCount = 0;

for (let i = 0; i < H; i++) {
  // 석순은 처음에 다 포함하고(N/2), 하나씩 뺀다
  // 종유석은 처음에 다 빼고, 하나씩 포함한다 (끝부터) 즉, i = 1 -> H - 1, i = 2 -> H - 2
  if (i > 0) {
    SScurr -= SScount[i - 1];
    JWScurr += JWScount[H - 1 - i];
  }
  if (min > SScurr + JWScurr) {
    min = SScurr + JWScurr;
    minCount = 1;
  } else if (min === SScurr + JWScurr) {
    minCount++;
  }
}
console.log(min, minCount);
