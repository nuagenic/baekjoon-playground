const arr = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")[1]
  .split(" ")
  .map(Number);

// 1차 답안
/**
 * 1. 배열의 각 요소를 map 함수에 돌린다.
 * 2. 배열의 요소 전까지 하는 스택을 만든다.
 * 3. 스택에서 하나씩 pop하면서 현재 요소보다 크거나 같으면, 해당 값을 리턴한다.
 * 4. 모두 다 pop됐으면 0을 리턴한다.
 */
// 9(idx=1)를 보려면 stack에서 4개를 빼야 함. 0~4 또는 0번만 보면 됨.

// function solution(arr) {
//   const mappedArr = arr.map((x, idx, a) => {
//     const stack = [...arr];
//     for (let i = 0; i < a.length - idx; i++) {
//       stack.pop();
//     }
//     while (stack.length > 0) {
//       const pop = stack.pop();
//       if (pop >= x) return stack.length + 1;
//     }
//     return 0;
//   });
//   return mappedArr;
// }

// console.log(solution(arr));

// function solution(arr) {
//   const mappedArr = arr.map((x, idx, a) => {
//     for (let i = idx - 1; i >= 0; i--) {
//       if (arr[i] >= x) return i + 1;
//     }
//     return 0;
//   });
//   return mappedArr;
// }

// console.log(solution(arr));

// 2차 답안
/**
 * 이중 for문이 만들어지면서 메모리 초과가 발생한다. 더 간단한 알고리즘을 찾아야 한다.
 * 우선 6을 넣고 0을 리턴
 * 9는 6보다 크므로, 그 이전의 것들은 나중을 위해 다 override되어야 한다.
 */
function solution(arr) {
  const stack = []; // 비교를 위한 임시 스택. 아이템과 인덱스를 집어넣는다.
  const mappedArr = arr.map((x, idx, a) => {
    if (stack.length === 0) {
      stack.push({ item: x, index: idx });
      return 0;
    }
    // 비교 대상이 스택보다 크면 작은 걸 찾을 때까지 pop한다.
    while (stack.length) {
      const pop = stack.pop();
      if (pop.item >= x) {
        stack.push(pop);
        stack.push({ item: x, index: idx });
        return pop.index + 1;
      }
    }
    stack.push({ item: x, index: idx });
    return 0;
  });
  return mappedArr;
}

console.log(solution(arr).join(" "));
