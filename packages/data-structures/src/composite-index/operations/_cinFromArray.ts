import { CompositeIndexNode } from "../composite-index-node"
import { _cinSet } from "./_cinSet"

export const _cinFromArray = <K, V>(arr: Array<[K[], V]>) => {
    let cin: CompositeIndexNode<K, V> = new CompositeIndexNode()
    for (let [path, val] of arr) {
        _cinSet(cin, path, val);
    }
    return cin;
}