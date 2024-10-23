# 백준 playground

백준 문제를 자료구조/알고리즘 분류에 따라 풀어봅니다.
최종 답안뿐만 아니라 시도했던 과정을 기록합니다.

# 한줄 입력 받을 시

```js
let input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ");
// 로컬에서 실행 시 readFileSync()의 파라미터는 파일 경로로 수정
// 숫자 전환이 필요하면 let num = Number(input); 등 사용
```

# 여러 줄 입력 받을 시

```js
let input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
```
