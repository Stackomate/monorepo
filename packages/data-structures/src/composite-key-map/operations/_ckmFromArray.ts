import { CompositeKeyNode } from "../../precompile-output/composite-key-node"
import { _ckmSet } from "./_ckmSet"

/**
 * Create Composite Key map from array
 * @param arr Array of pairs containing some path (composite key) and value
 * @returns Composite Key Node for map's root
 */
export const _ckmFromArray = <K, V>(arr: Array<[K[], V]>) => {
    let ckm: CompositeKeyNode<K, V> = new CompositeKeyNode()
    for (let [path, val] of arr) {
        _ckmSet(ckm, path, val);
    }
    return ckm;
}