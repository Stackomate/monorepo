import { CompositeKeyNode } from "../composite-index-node";

/* TODO: add has with value */

export const _ckmHas = <K, V>(indexRoot: CompositeKeyNode<K, V>, path: K[]): boolean => {
    let currentNode = indexRoot;
    for (let item of path) {
        if (!currentNode.children.has(item)) {
            return false;
        }
        currentNode = currentNode.children.get(item) as CompositeKeyNode<K, V>;
    }
    return currentNode.isKey;
};
