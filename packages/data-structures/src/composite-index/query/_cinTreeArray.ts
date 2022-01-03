import { CompositeIndexNode } from "../composite-index-node";

type TreeItem <K, V> = {isKey: boolean, key: K, value: V | undefined, children: Array<TreeItem<K,V>>};
type TreeArray<K, V> = Array<TreeItem<K,V>>;

export const _cinTreeArray = <K, V>(indexRoot: CompositeIndexNode<K, V>) => {

    const step = <K, V>(node: CompositeIndexNode<K, V>, parentNodeKey: K) => {
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