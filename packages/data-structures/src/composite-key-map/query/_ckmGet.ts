import { CompositeKeyNode } from "../../precompile-output/composite-key-node";

/* TODO: Add custom empty result? */

/**
 * Return assigned value for a given path, if defined
 * @param indexRoot Root node for Composite Key Map 
 * @param path Path for lookup
 * @returns Value for path, or undefined. To distinguish between undefined value and 
 * undefined key, one may use _ckmHas method
 */
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

export const ckmGet = <K, V>(path: K[]) => (indexRoot: CompositeKeyNode<K, V>) => _ckmGet(indexRoot, path);
