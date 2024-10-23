const arr = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("");

// 1차 답안
/**
 * 주어진 arr을 queue라고 생각하고, 앞부터 하나씩 순회한다.
 * answer = 0이라 두고, 괄호가 필요할 때마다 한개씩 더한다.
 * temp를 스택으로 설정하고, unresolved 왼쪽 괄호를 넣어두는 용도로 쓴다.
 * 만약 ")"일 경우, answer에 1을 더한다.
 * 만약 "("일 경우, temp에 push 해둔다.
 * 오른쪽 괄호가 나오면, 하나를 pop한다.
 * 순회가 끝나면, 남은 왼쪽 괄호의 개수만큼 answer에 더한다.
 */

function solution(arr) {
  let answer = 0;
  const temp = [];
  arr.forEach((x) => {
    if (x === ")") {
      if (temp.length === 0) answer++;
      else temp.pop();
    } else temp.push(x);
  });
  answer += temp.length;
  return answer;
}

console.log(solution(arr));
