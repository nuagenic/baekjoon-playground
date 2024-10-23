const arr = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("");

// 1차 답안
/**
 * isValid를 통해 먼저 올바른 괄호열인지 알아내고, 그 다음에 값을 구해야 할 것이다.
 * 길이가 최대 30이니 forEach문 또는 재귀문을 돌리는 것이 나쁘지 않아 보인다.
 * 재귀로 한다면 다음과 같이 할 수 있다.
 * 1. "("나 "["를 찾으면 ")"나 "]"를 찾는다.
 * 2. 탐색하는 도중 다른 "("나 "["를 만나면 그 함수를 스택에 넣고 돌린다.
 * 3. 자기 짝을 찾으면 값을 리턴하고 끝낸다.
 */

// 2차 답안
/**
 * 결국 중요한 것은 닫히는 괄호열이 들어왔을 때 판단하는 것이다. 주어진 arr 외에 새로운 스택을
 * 하나 두고, 거기의 top과 비교하면서 로직을 비교할 수 있다.
 * 예를 들어 ")"이 들어왔을 때,
 * 1) top === "(" => return 2 * temp (pop 하고 2를 push)
 * 2) top === "[" => invalid하므로 return 0
 * 3) top === "숫자" => 괄호가 나올 때까지 pop 하되, 괄호가 나오면 1)로 돌아감
 */

function solution(arr) {
  const answer = [];

  if (!checkPossible(arr)) {
    return 0;
  }

  for (let i = 0; i < arr.length; i++) {
    let top = answer[answer.length - 1];
    const cur = arr[i];

    if (cur === "(" || cur === "[") {
      answer.push(cur);
    } else if (cur === ")" || cur === "]") {
      const reverse = cur === ")" ? "(" : "[";
      const point = reverse === "(" ? 2 : 3;

      if (top === reverse) {
        answer.pop();
        answer.push(point);
      } else {
        let temp = 0;
        while (1) {
          const pop = answer.pop();
          if (typeof pop === "number") {
            temp += pop;
          } else if (pop === reverse) {
            answer.push(temp * point);
            break;
          }
        }
      }
    }
  }
  return answer.reduce((acc, cur) => acc + cur);
}

function checkPossible(arr) {
  const stack = [];
  for (let i = 0; i < arr.length; i++) {
    let top = stack[stack.length - 1];
    const cur = arr[i];

    if (cur === "]" && top === "[") stack.pop();
    else if (cur === ")" && top === "(") stack.pop();
    else stack.push(cur);
  }
  return stack.length ? false : true;
}

console.log(solution(arr));
