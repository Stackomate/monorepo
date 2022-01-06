import { Batcher } from "../../precompile-output/batcher";
import { BREAK } from "./_arrForEach";
import { _arrIteratorForEach } from "./_arrIteratorForEach";

/** Similar to _arrForEach, but allows the loop to break by returning BREAK symbol.
 * This is similar to for of with _arrIteratorForEach, by has the limitation of not being able to stop the main function execution from within the callback function.
 */
 export const _arrForEachWithBreak = <T>(batcher: Batcher<Array<T>>, fn: (a: T, index: number, array: Array<T>) => void | typeof BREAK) : Batcher<Array<T>> => {
    for (let [item, index, arr] of _arrIteratorForEach(batcher)) {
        let result = fn(item, index, arr);
        if (result === BREAK) {
            return batcher;
        } 
    }
    return batcher;
}