# js로 스택 구현하기

- 기본 메소드를 사용한다면? 간단하게 표현 가능.

```js
class Stack {
  constructor() {
    this.arr = [];
  }

  push(item) {
    this.arr.push(item);
  }

  pop() {
    return this.arr.pop();
  }
}
```

- 그러나 기본 메소드를 사용하지 않는다면?

```js
class Stack {
  constructor() {
    this.arr = [];
    this.index = 0;
  }

  push(item) {
    this.arr[this.index++] = item;
  }

  pop() {
    if (this.index <= 0) return null;
    const result = this.arr[--this.index];
    return result;
  }
}
```
