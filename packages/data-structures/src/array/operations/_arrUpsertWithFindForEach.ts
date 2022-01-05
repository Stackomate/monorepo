
/* TODO: Add option for function to include empty slots */

import { Batcher } from "../../batcher";
import { _arrPush } from "./_arrPush";
import { _arrSetIndex } from "./_arrSetIndex";
import { _arrIteratorForEach } from "../queries/_arrIteratorForEach";
import { _arrLength } from "../queries/_arrLength";

/**
 * Attempt to find the first element that satifisfies the condition and apply a function to it.
 * If not found, fallback to result of fallback function.
 * Unline _arrUpsertWithFind, this method uses the forEach iterator, which always finishes and skips empty slots
 * @param batcher 
 * @param findOne 
 * @param fn 
 * @param fallback 
 * @returns 
 */
 export const _arrUpsertWithFindWithForEach = <T>(
    batcher: Batcher<Array<T>>, 
    findOne: (item: T, index: number, array: Array<T>) => boolean,
    fn: (item: T, index: number, array: Array<T>) => T, 
    fallback: (index: number, array: Array<T>) => T
) => {
    for (let [item, index, arr] of _arrIteratorForEach(batcher)) {
        if (findOne(item, index, arr)) {
            _arrSetIndex(batcher, index, fn(item, index, arr))
            return batcher;
        }
    };

    _arrPush(batcher, fallback(_arrLength(batcher), batcher.currentValue));
    return batcher;
}