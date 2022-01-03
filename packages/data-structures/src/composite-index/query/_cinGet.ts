import { CompositeIndexNode } from "../composite-index-node";

/* TODO: Custom empty result */
export const _cinGet = <K, V>(indexRoot: CompositeIndexNode<K, V>, path: K[]): V | undefined => {
    let currentNode = indexRoot;
    for (let item of path) {
        if (!currentNode.children.has(item)) {
            return undefined;
        }
        currentNode = currentNode.children.get(item) as CompositeIndexNode<K, V>;
    }
    return currentNode.isKey ? currentNode.value : undefined;
};
