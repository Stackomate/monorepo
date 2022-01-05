import { Batcher } from "../batcher";
import { BinaryTreeNode } from "./binary-tree-node";
import { BinarySearchTree } from "./binary-search-tree";

export const _btrIsEmpty = <T>(treeBatcher: Batcher<BinarySearchTree<T>>) => {
    return treeBatcher.currentValue.root === null;
};

export const btrIsEmpty = <T>() => (treeBatcher: Batcher<BinarySearchTree<T>>) => {
    return _btrIsEmpty(treeBatcher);
};

const _btrAdd = <T>(treeBatcher: Batcher<BinarySearchTree<T>>, value: T) => {
    if (_btrIsEmpty(treeBatcher)) {

        treeBatcher.willChange();
        treeBatcher.currentValue.root = new BinaryTreeNode(
            value,
            null,
            null
        );
        
        return treeBatcher;
    }


    let parentNode = null;
    let direction = 0;
    let currentNode = treeBatcher.currentValue.root;
    while (currentNode !== null) {
        parentNode = currentNode;        
        if (value >= currentNode.value) {
            currentNode = currentNode.right;
            direction = 1;
        } else {
            currentNode = currentNode.left;
            direction = -1;
        }
    };

    /* TODO: Improve this code */
    (parentNode as BinaryTreeNode<T>)[direction === 1 ? 'right' : 'left'] = new BinaryTreeNode(
        value,
        null,
        null
    );

    return treeBatcher;
};

export const btrInorderIterator = function* <T>(node: BinaryTreeNode<T> | null) : Generator<T, void, unknown>{
    if (node !== null) {
        yield* btrInorderIterator(node.left);
        yield node.value;
        yield* btrInorderIterator(node.right);
    }
}

export const btrAdd = <T>(value: T) => (treeBatcher: Batcher<BinarySearchTree<T>>): Batcher<BinarySearchTree<T>> => {
    return _btrAdd(treeBatcher, value);
};
