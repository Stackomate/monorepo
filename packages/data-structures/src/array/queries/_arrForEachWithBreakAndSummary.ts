import { Batcher } from "../../precompile-output/batcher";
import { BREAK } from "./_arrForEach";
import { _arrIteratorForEach } from "./_arrIteratorForEach";

/** Similar to _arrForEachWithBreak, but returns a summary of what happened inside of the array
 */
 export const _arrForEachWithBreakAndSummary = <T>(batcher: Batcher<Array<T>>, fn: (a: T, index: number, array: Array<T>) => void | typeof BREAK) : [Batcher<Array<T>>, {success: true} | {success: false, item: T, index: number, arr: T[]}] => {
    for (let [item, index, arr] of _arrIteratorForEach(batcher)) {
        let result = fn(item, index, arr);
        if (result === BREAK) {
            return [batcher, {success: false, item, index, arr}];
        } 
    }
    return [batcher, {success: true}];
}