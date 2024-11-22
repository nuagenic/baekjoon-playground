# Binary Search Tree

- 각 node는 고유한 key를 가짐.
- root node의 왼쪽 subtree는 해당 node의 key보다 작은 key값, 오른쪽 subtree는 해당 node의 key보다 큰 key값
- 탐색, 삽입, 삭제 시에 평균적으로 O(logN)의 시간복잡도를 가짐
- 연결 리스트와 개념적으로 유사하기 때문에, 이를 이용해 구현하는 것이 바람직함

```js
class treeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // 삽입 메소드
  insert(value) {
    let node = new treeNode(value);

    if (!this.root) {
      this.root = node;
      return this;
    }

    let current = this.root;
    while (current) {
      if (value === current.value) return;

      if (value < current.value) {
        if (!current.left) {
          current.left = node;
          return this;
        }
        current = current.left;
      }

      if (value > current.value) {
        if (!current.right) {
          current.right = node;
          return this;
        }
        current = current.right;
      }
    }
  }

  // 탐색 메소드
  find(value) {
    if (!this.root) return false;

    let current = this.root;
    let found = false;

    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = current;
      }
    }

    if (!found) return;
    return found;
  }

  remove(value) {
    this.root = this.removeNode(this.root, value);
  }

  removeNode(current, value) {
    // tree가 empty인 경우
    if (current === null) return current;

    // 만약 current === value라면 삭제한다.
    if (value === current.value) {
      // child가 0개거나 1개인 node
      if (current.left === null && current.right === null) {
        return null;
      } else if (current.left === null) {
        return current.right;
      } else if (current.right === null) {
        return current.left;
      } else {
        // child가 2개인 node
        let tempNode = this.kthSmallestNode(current.right);
        current.value = tempNode.value;

        current.right = this.removeNode(current.right, tempNode.value);
        return current;
      }
    } else if (value < current.value) {
      current.left = this.removeNode(current.left, value);
      return current;
    } else {
      current.right = this.removeNode(current.right, value);
      return current;
    }
  }

  kthSmallestNode(node) {
    while (!node.left === null) node = node.left;

    return node;
  }
}
```

(출처: [Binary Search Tree in JavaScript](https://medium.com/swlh/binary-search-tree-in-javascript-31cb74d8263b))
