# js queue 구현

```js
class Queue {
  constructor() {
    this.arr = [];
  }

  enqueue(item) {
    this.arr.push(item);
  }

  dequeue() {
    return this.arr.shift();
  }

  peek() {
    return this.arr[0];
  }
}
```

이렇게 하면 간단하게 구현이 가능하지만, 문제는 `shift()` 메소드의 작동 방식이 시간복잡도 O(n)을 가진다는 점이다. 왜냐하면 `shift()`는 첫번째 인덱스의 원소를 제거한 후, 나머지 원소들의 인덱스를 1만큼 감소시키기 때문이다.

따라서 이 방법 대신, 연결리스트나 포인터를 사용하여 시간복잡도를 개선해야 한다. 이 중 객체를 이용해 일종의 해시로 큐를 구현하는 방법을 살펴볼 것.
[출처](https://velog.io/@longroadhome/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-JS%EB%A1%9C-%EA%B5%AC%ED%98%84%ED%95%98%EB%8A%94-.%ED%81%90-Queue)

```js
class Queue {
    constructor() {
        this.storage = {};
        this.front = 0; // front와 rear는 포인터 개념으로 작동
        this.rear = 0;

        size() {
            if (this.storage[rear] === undefined) {
                return 0;
            } else {
                return this.rear - this.front + 1;
            }
        }

        enqueue(value) {
            if(this.size() === 0) {
                this.storage['0'] = value;
            } else {
                this.rear += 1;
                this.storage[this.rear] = value;

            }
        }

        dequeue() {
            let temp;
            if(this.front === this.rear) {
                temp = this.storage[this.front];
                delete this.storage[this.front];
                this.front = 0;
                this.rear = 0;
            } else {
                temp = this.storage[this.front];
                delete this.storage[this.front];
                this.front += 1;
            }
            return temp;
        }
    }
}
```
