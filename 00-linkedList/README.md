# 일반 리스트(배열 리스트) vs 연결 리스트

- 연결 리스트는 공간의 연속성이 없기 때문에, 정렬이나 검색 작업 시 시간이 더 걸림.
  - 배열 리스트는 i번 원소를 찾을 때 i값으로 즉시 접근할 수 있지만, 연결 리스트는 헤드 노드부터 따라감.
- 또한 배열 리스트는 삽입이나 삭제 시 원소를 시프트 해야 한다는 단점도 존재.
- 그리고 원소 하나당 필요한 공간도 배열 리스트가 적음(연결 리스트는 다음 원소의 링크를 위한 공간도 필요하기 때문)
- 그러나 보통 배열 리스트는 얼마나 들어올지 모르기 때문에 충분한 크기로 선언하느라 공간 낭비가 불가피
- 이런 불편함을 해결하기 위해 원형 연결 리스트, 양방향 연결 리스트 등이 존재
- 즉, 정렬이나 탐색에는 배열이 유리하지만, 데이터의 추가/삭제에는 연결리스트가 효율적이다.

# 연결 리스트 구현

```js
class Node {
  // tail node의 next는 null이기 때문에, next의 default value는 null로 지정.
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null; // 빈 LinkedList의 경우 head가 null
    this.size = 0;
  }

  // 첫번째 노드로 삽입
  insertFirst(data) {
    this.head = new Node(data, this.head);
    this.size++;
  }

  // 마지막 노드로 삽입
  insertLast(data) {
    const node = new Node(data);
    let current;

    if (!this.head) {
      this.head = node;
    } else {
      current = this.head;

      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  // 원하는 인덱스에 삽입
  insertAt(data, index) {
    if (index > 0 && index > this.size) {
      return;
    }

    if (index === 0) {
      this.head = new Node(data, this.head);
      this.size++;
      return;
    }

    const node = new Node(data);
    let current, previous;

    current = this.head;
    let count = 0;

    while (count < index) {
      previous = current;
      count++;
      current = current.next;
    }

    node.next = current;
    previous.next = node;

    this.size++;
  }

  // 해당 인덱스의 노드 get
  getAt(index) {
    let current = this.head;
    let count = 0;

    while (current) {
      if (count === index) {
        return current.data;
      }
      count++;
      current = current.next;
    }
    return null;
  }

  removeAt(index) {
    if (index > 0 && index > this.size) {
      return;
    }

    let current = this.head;
    let previous;
    let count = 0;

    if (index === 0) {
      this.head = current.next;
    } else {
      while (count < index) {
        count++;
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }

    this.size--;
  }

  clearList() {
    this.head = null;
    this.size = 0;
  }

  printListData() {
    let current = this.head;

    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}
```
