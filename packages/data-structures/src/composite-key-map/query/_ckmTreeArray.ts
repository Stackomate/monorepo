import { CompositeKeyNode } from "../composite-key-node";

type TreeItem <K, V> = {isKey: boolean, key: K, value: V | undefined, children: Array<TreeItem<K,V>>};
type TreeArray<K, V> = Array<TreeItem<K,V>>;

/**
 * Transform Composite Key Map into array of entries
 * @param indexRoot Root Node for Composite Key Map
 * @returns Array of Tree Items
 */
export const _ckmTreeArray = <K, V>(indexRoot: CompositeKeyNode<K, V>) => {

    const step = <K, V>(node: CompositeKeyNode<K, V>, parentNodeKey: K) => {
        let result: TreeItem<K, V> = {
            isKey: node.isKey,
            value: node.value,
            key: parentNodeKey,
            children: []
        };
        for (let [key, value] of node.children) {
            result.children.push(step(value, key));
        }
        return result;
    }

    let r = [];

    for (let [key, value] of indexRoot.children) {
        r.push(step(value, key))
    }

    return r;

}

export const ckmTreeArrayn = <K, V>() => (indexRoot: CompositeKeyNode<K, V>) => _ckmTreeArray(indexRoot);
