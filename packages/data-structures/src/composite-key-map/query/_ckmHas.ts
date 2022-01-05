import { CompositeKeyNode } from "../composite-key-node";

/* TODO: add has with value */

/**
 * Checks if a given path is defined in the Composite Key Map
 * @param indexRoot Root node for Composite Key Map
 * @param path Path to be checked for existence
 * @returns True or false
 */
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
