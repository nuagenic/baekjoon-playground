# 우선순위 큐: 힙

- 우선순위 큐 자체는 선형 자료구조로 구현할 수도 있지만, 완전 이진 트리 구조를 이용하는 힙을 소개
- 트리는 노드들이 위에서 아래로 부모-자식 관계로 매달린 것을 말함
- 루트 노드: 부모가 없는 유일한 노드
- 리프 노드: 자식이 하나도 없는 노드
- 이진 트리: 모든 노드가 2개 이하의 자식을 갖는 트리
- 포화 이진 트리: 루트로부터 시작해 모든 노드가 정확히 자신 노드를 2개씩 가지면서 꽉 채워진 트리 (즉, 자식 노드가 맨 아래 레벨에 위치)
  - 포화 이진 트리에서 원소의 개수는 2^k-1
- 완전 이진 트리: 노드 수가 맞지 않아 포화 이진 트리를 만들 수 없을 때, 최대한 포화 이진 트리에 가깝게 만든 것
  - 노드의 수가 2^k-1이 되지 못하면, 맨 아래 레벨을 왼쪽부터 차례로 채운다.

## 힙의 조건

1. 완전 이진 트리
2. 힙 특성: 모든 노드는 값을 갖고, 자식 노드(들) 값보다 크거나 같다.

- 즉, 우선순위가 가장 큰 원소가 루트에 자리하며, 이런 힙을 최대 힙(Max Heap)이라 한다.
- 반대로 최소 힙도 만들 수 있을 것이고.
- 동일한 값이 여러 개 저장되는 건 상관없음.

# JS Heap 구현

[heap 구현](https://velog.io/@longroadhome/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-JS%EB%A1%9C-%EA%B5%AC%ED%98%84%ED%95%98%EB%8A%94-HEAP)

```js
class Heap {
  constructor() {
    this.heap = [null]; // 첫 요소는 사용하지 않기 위함. 즉 루트 노드가 인덱스 1
  }

  heappush(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor(curIdx / 2);

    // 부모노드가 현재노드보다 작다면 스며올리기 실행
    while (curIdx > 1 && this.heap[parIdx] < this.heap[curIdx]) {
      [this.heap[parIdx], this.heap[curIdx]] = [
        this.heap[curIdx],
        this.heap[parIdx],
      ];
      curIdx = parIdx;
      parIdx = Math.floor(curIdx / 2);
    }
  }

  heappop() {
    const max = this.heap[1];
    if (this.heap.length <= 2) this.heap = [null];
    else this.heap[1] = this.heap.pop();

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = curIdx * 3;

    // 왼쪽 자식이 없다는 것은 오른쪽 자식도 없으므로 루트라는 얘기. 즉 바로 반환
    if (!this.heap[leftIdx]) return max;
    if (!this.heap[rightIdx]) {
      if (this.heap[leftIdx] > this.heap[curIdx]) {
        [this.heap[leftIdx], this.heap[curIdx]] = [
          this.heap[curIdx],
          this.heap[leftIdx],
        ];
      }
      return max;
    }

    while (
      this.heap[leftIdx] > this.heap[curIdx] ||
      this.heap[rightIdx] > this.heap[curIdx]
    ) {
      const maxIdx =
        this.heap[leftIdx] > this.heap[rightIdx] ? leftIdx : rightIdx;
      [this.heap[maxIdx], this.heap[curIdx]] = [
        this.heap[curIdx],
        this.heap[maxIdx],
      ];
      curIdx = maxIdx;
      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
    }
    return max;
  }
}
```
