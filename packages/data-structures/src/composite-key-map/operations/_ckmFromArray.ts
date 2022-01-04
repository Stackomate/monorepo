import { CompositeKeyNode } from "../composite-index-node"
import { _ckmSet } from "./_ckmSet"

export const _ckmFromArray = <K, V>(arr: Array<[K[], V]>) => {
    let ckm: CompositeKeyNode<K, V> = new CompositeKeyNode()
    for (let [path, val] of arr) {
        _ckmSet(ckm, path, val);
    }
    return ckm;
}