const N = Number(require("fs").readFileSync("./input.txt").toString().trim());

// 1차 답안
/**
 * 첫번째 원소를 빼야 하니(또는 삭제 방향과 삽입 방향이 다르니) 큐를 사용한다.
 * 위에서 빼서 아래로 집어넣는 것은 큐를 떠올리면 좋겠다.
 * 1. dequeue()한다.
 * 2. dequeue()한 값을 enqueue()한다.
 * 3. 원소가 하나 남을 때까지 반복한다.
 */

const queue = [];
const answer = [];
for (let i = 1; i <= N; i++) {
  queue.push(i);
}

while (queue.length) {
  const top = queue.shift();
  answer.push(top);
  if (queue.length) {
    const secondTop = queue.shift();
    queue.push(secondTop);
  }
}

console.log(answer.join(" "));
