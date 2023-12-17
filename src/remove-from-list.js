const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined using interface
 * class ListNode {
 *   constructor(x) {
 *     this.value = x;
 *     this.next = null;
 *   }
 * }
 */

function convertArrayToList(arr) {
  return arr.reverse().reduce((acc, cur) => {
    if (acc) {
      const node = new ListNode(cur);
      node.next = acc;
      return node;
    }

    return new ListNode(cur);
  }, null);
}

function removeKFromList( l, k ) {
  let size = getSize(l);
  let position = 0;
  position = findIndex(k, l);
  while(position !== -1) {
    [size, l] = removeElement(position, size, l);
    position = findIndex(k, l);
  }
  return l;
}

function getSize(list) {
  index = 0;
  let actual = list;
  while( actual ) {
    actual = actual.next;
    index++;
  }
  return index;
}

function removeElement( position, size, header ) {
  if(position < 0 || position >= size) {
    return null;
  } else {
    let actual = header;
    if(position === 0) {
      header = header.next;
    } else {
      let linkPast = null;
      let index = 0;
      while(index < position) {
        linkPast = actual;
        actual = actual.next;
        index++;
      }
      linkPast.next = actual.next;
    }
  }
  size--;
  return [size, header];
}

function findIndex( element, header ) {
  actual = header;
  index = 0;

  while( actual ) {
    if(actual.value === element) {
      return index;
    } else {
      actual = actual.next;
      index++;
    }
  }
  return -1;
}

console.log(removeKFromList(convertArrayToList([3, 1, 2, 3, 4, 5]), 3));

module.exports = {
  removeKFromList
};
