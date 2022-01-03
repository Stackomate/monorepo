import { CompositeIndexNode } from "../composite-index-node";

/* TODO: add has with value */

export const _cinHas = <K, V>(indexRoot: CompositeIndexNode<K, V>, path: K[]): boolean => {
    let currentNode = indexRoot;
    for (let item of path) {
        if (!currentNode.children.has(item)) {
            return false;
        }
        currentNode = currentNode.children.get(item) as CompositeIndexNode<K, V>;
    }
    return currentNode.isKey;
};
