import { Batcher } from "../precompile-output/batcher";
import { BinaryTreeNode } from "./binary-tree-node";

export const cloneBinaryTreeNode = <T>(initial: BinaryTreeNode<T>) => new BinaryTreeNode(
    initial.value,
    initial.left,
    initial.right
);

const createBatcher = <T>(target: BinaryTreeNode<T>, mutate: boolean = false) => {
    return new Batcher(target, mutate, cloneBinaryTreeNode);
};
interface Prepare {
    <T>(target: BinaryTreeNode<T>, mutate?: boolean): Batcher<BinaryTreeNode<T>>;
    <T>(target: undefined, mutate: undefined, batcher: Batcher<BinaryTreeNode<T>>): Batcher<BinaryTreeNode<T>>;
}

export const useBinaryTreeNodeBatcher: Prepare = <T>(
    target?: BinaryTreeNode<T>,
    mutate?: boolean,
    batcher?: Batcher<BinaryTreeNode<T>>): Batcher<BinaryTreeNode<T>> => {
    /* TODO: Remove as Array<T> */
    return batcher || createBatcher(target as BinaryTreeNode<T>, mutate);
};

/* TODO: Create batchers from Arrays */