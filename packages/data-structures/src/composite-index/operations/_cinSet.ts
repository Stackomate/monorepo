import { CompositeIndexNode } from "../composite-index-node";

/* Examples */
/* [root] => 10
    [root, 'a'] => 20
    [root, 'b', 'c'] => 30 (note that root.b is not a key) */
export const _cinSet = <K, V>(indexRoot: CompositeIndexNode<K, V>, path: K[], value: V): CompositeIndexNode<K, V> => {
    let currentNode = indexRoot;
    for (let item of path) {
        if (!currentNode.children.has(item)) {
            currentNode.children.set(item, new CompositeIndexNode());
        }
        currentNode = currentNode.children.get(item) as CompositeIndexNode<K, V>;
    }
    /* Mark isKey = true and assign value for last explored node */
    currentNode.isKey = true;
    currentNode.value = value;

    /* Will modify part of the index nodes, and add new nodes */
    /* For modify part, find modify path and possibly clone all nodes in the path */
    return indexRoot;
};
