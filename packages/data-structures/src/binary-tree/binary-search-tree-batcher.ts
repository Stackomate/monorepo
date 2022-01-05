import { Batcher } from "../batcher";
import { BinarySearchTree } from "./binary-search-tree";

export const cloneBinarySearchTree = <T>(initial: BinarySearchTree<T>) => new BinarySearchTree(initial.root);

const createBatcher = <T>(target: BinarySearchTree<T>, mutate: boolean = false) => {
    return new Batcher(target, mutate, cloneBinarySearchTree);
};
interface Prepare {
    <T>(target: BinarySearchTree<T>, mutate?: boolean): Batcher<BinarySearchTree<T>>;
    <T>(mutate?: boolean): Batcher<BinarySearchTree<T>>;
}

export const createBinarySearchTreeBatcher: Prepare = <T>(
    target?: BinarySearchTree<T> | boolean,
    mutate?: boolean): Batcher<BinarySearchTree<T>> => {
    if (typeof target !== 'boolean') {
        /* TODO: Remove as Array<T> */
        return createBatcher((target as BinarySearchTree<T>) || new BinarySearchTree(), mutate);
    } else {
        return createBatcher(new BinarySearchTree(), mutate);
    }
};