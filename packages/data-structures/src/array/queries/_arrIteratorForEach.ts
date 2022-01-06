import { Batcher } from '../../precompile-output/batcher';
import { forEachYield } from './for-each-yield';

/* 2 differences: does not include empty indexes, and maybe should not loop forever (only includes initial items?) */
/* forEach stops in the length of the original array */
/* TODO: Use the polyfill and add yield for the fn call (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Modifying_the_array_during_iteration) */

export const _arrIteratorForEach = <T>(batcher: Batcher<Array<T>>): IterableIterator<[T, number, T[]]> => {
    return forEachYield(batcher.currentValue);
};
