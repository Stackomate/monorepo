import { CompositeKeyNode } from "../composite-index-node";

/* TODO: Custom empty result */
export const _ckmGet = <K, V>(indexRoot: CompositeKeyNode<K, V>, path: K[]): V | undefined => {
    let currentNode = indexRoot;
    for (let item of path) {
        if (!currentNode.children.has(item)) {
            return undefined;
        }
        currentNode = currentNode.children.get(item) as CompositeKeyNode<K, V>;
    }
    return currentNode.isKey ? currentNode.value : undefined;
};
