import { BinaryTreeNode } from "./binary-tree-node";

/* TODO: Test batchers with immutable strategy too */


export class BinarySearchTree<T> {
    constructor(
        public root: BinaryTreeNode<T> | null = null
    ) {}
}

/* TODO: Create from Arrays */