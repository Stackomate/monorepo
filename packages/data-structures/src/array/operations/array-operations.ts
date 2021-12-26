import { createArrayBatcher } from '../batcher';
import {Batcher} from '../../batcher';
import { forEachYield } from '../queries/for-each-yield';
import { _arrLength } from '../queries/_arrLength';
import { _arrSetIndex } from './_arrSetIndex';
import { _arrPush } from './_arrPush';
import { BREAK } from '../queries/_arrForEach';
import { _arrEntries } from '../queries/_arrEntries';
import { _arrValues } from '../queries/_arrValues';

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


export const _arrIterator = _arrValues;

/* 2 differences: does not include empty indexes, and maybe should not loop forever (only includes initial items?) */

/* forEach stops in the length of the original array */
/* TODO: Use the polyfill and add yield for the fn call (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Modifying_the_array_during_iteration) */
export const _arrIteratorForEach = <T>(batcher: Batcher<Array<T>>) : IterableIterator<[T, number, T[]]> => {
    return forEachYield(batcher.currentValue);
}
export const _arrFindWithForEach = <T>(batcher: Batcher<Array<T>>, fn: (item: T, index: number, array: Array<T>) => boolean) => {
    for (let [item, index, arr] of _arrIteratorForEach(batcher)) {
        if (fn(item, index, arr)) {
            return item;
        }
    }
    return undefined;
}



/* TODO: Add option for function to include empty slots */
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

export const _arrUpsertWithFind = <T>(
    batcher: Batcher<Array<T>>, 
    findOne: (item: T, index: number, array: Array<T>) => boolean,
    fn: (item: T, index: number, array: Array<T>) => T, 
    fallback: (index: number, array: Array<T>) => T
) => {
    let arr = batcher.currentValue;
    for (let [index, item] of _arrEntries(batcher)) {
        if (findOne(item, index, arr)) {
            _arrSetIndex(batcher, index, fn(item, index, arr))
            return batcher;
        }
    };

    _arrPush(batcher, fallback(_arrLength(batcher), batcher.currentValue));
    return batcher;
}

