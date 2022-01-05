import { CompositeKeyNode } from "../composite-key-node";
import { _ckmHas } from "../query/_ckmHas";

/**
 * Removes a path from the map (if existent)
 * @param indexRoot Node representing the root of Composite Key Map
 * @param path Path to object to be removed
 * @returns Root object with changes
 */
export const _ckmRemove = <K, V>(indexRoot: CompositeKeyNode<K, V>, path: K[]): CompositeKeyNode<K, V> => {

    /* TODO: Optimize performance */
    if (!_ckmHas(indexRoot, path)) {
        return indexRoot;
    }

    let nodes = [indexRoot];
    let currentNode = indexRoot;
    let currentNodeIndex = 0;

    for (let key of path) {
        let childNode = currentNode.children.get(key) as CompositeKeyNode<K, V>;
        nodes.push(childNode);
        currentNode = childNode;
        currentNodeIndex++;
    }

    /* Remove isKey from last node and unassign its value */
    let lastNode = nodes[nodes.length - 1];
    lastNode.isKey = false;
    lastNode.value = undefined;

    while (currentNodeIndex !== 0) {
        let parentNode = nodes[currentNodeIndex - 1];
        if (currentNode.children.size === 0) {
            /* Path index has a -1 difference because it does not contain root key */
            let pathIndex = currentNodeIndex - 1;
            parentNode.children.delete(path[pathIndex]);
        }

        currentNode = nodes[currentNodeIndex - 1];
        currentNodeIndex--;
    }

    return indexRoot;
};
