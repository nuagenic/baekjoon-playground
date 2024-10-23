const [_, ...arr] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// 1차 답변
/**
 * 스택에서 하나씩 pop한 뒤 새로운 배열에 push.
 * console.log는 꼭 저렇게 join 안 하고 그냥 한줄씩 뽑아도 무방함.
 */
const answer = [];
arr.forEach((x, index) => {
  answer[index] = [];
  const temp = x.split(" ");
  while (temp.length > 0) {
    let poppedWord = temp.pop();
    answer[index].push(poppedWord);
  }
});

for (let i = 0; i < arr.length; i++) {
  answer[i] = `Case #${i + 1}: ${answer[i].join(" ")}`;
}
console.log(answer.join("\n"));
