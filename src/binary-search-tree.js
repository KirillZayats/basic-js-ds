const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.tree = null;
    this.MIN_TYPE = "min";
    this.MAX_TYPE = "max";
  }

  root() {
    return this.tree ? this.tree : null;
  }

  add(data) {
    this.tree = this.addIn(this.tree, data);
  }

  addIn(node, data) {
    if (!node) {
      return new Node(data);
    } else if (node.data === data) {
      return node;
    } else if (data < node.data) {
      node.left = this.addIn(node.left, data);
    } else {
      node.right = this.addIn(node.right, data);
    }
    return node;
  }

  has(data) {
    return this.searchIn(this.tree, data);
  }

  searchIn(node, data) {
    if (!node) {
      return false;
    } else if (node.data === data) {
      return true;
    }
    return data > node.data
      ? this.searchIn(node.right, data)
      : this.searchIn(node.left, data);
  }

  find(data) {
    return this.findIn(this.tree, data);
  }

  findIn(node, data) {
    if (!node) {
      return null;
    } else if (node.data === data) {
      return node;
    }
    return data > node.data
      ? this.findIn(node.right, data)
      : this.findIn(node.left, data);
  }

  remove(data) {
    this.tree = this.removeNode(this.tree, data);
  }

  removeNode(node, data) {
    if (!node) {
      return null;
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      if (!node.right && !node.left) {
        return null;
      } else if (!node.right) {
        node = node.left;
        return node;
      } else if (!node.left) {
        node = node.right;
        return node;
      }

      let min = node.right;
      while (min.left) {
        min = min.left;
      }
      node.data = min.data;
      node.right = this.removeNode(node.right, min.data);
      return node;
    }
  }

  min() {
    return this.getMaxMin(this.MIN_TYPE);
  }

  max() {
    return this.getMaxMin(this.MAX_TYPE);
  }

  getMaxMin(type) {
    if (!this.tree) {
      return null;
    } else {
      let node = this.tree;
      switch (type) {
        case this.MIN_TYPE:
          while (node.left) {
            node = node.left;
          }
          break;
        case this.MAX_TYPE:
          while (node.right) {
            node = node.right;
          }
          break;
      }
      return node.data;
    }
  }
}

module.exports = {
  BinarySearchTree,
};
