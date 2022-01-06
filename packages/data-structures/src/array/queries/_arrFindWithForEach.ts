import { Batcher } from "../../precompile-output/batcher";
import { _arrIteratorForEach } from "./_arrIteratorForEach";

export const _arrFindWithForEach = <T>(batcher: Batcher<Array<T>>, fn: (item: T, index: number, array: Array<T>) => boolean) => {
    for (let [item, index, arr] of _arrIteratorForEach(batcher)) {
        if (fn(item, index, arr)) {
            return item;
        }
    }
    return undefined;
}