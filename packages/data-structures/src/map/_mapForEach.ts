import { Batcher } from '../precompile-output/batcher';
import { MapForEachFn } from "./MapForEachFn";

/**
 * Check whether an array index is not void. Negative indexes will count backwards from end of the array.
 * Note: Passed function will be called with (key, value, map) argument order
 */
export const _mapForEach = <T, U>(batcher: Batcher<Map<T, U>>, fn: MapForEachFn<T, U>): Batcher<Map<T, U>> => {
    /* Inverted ordering of key, value arguments */
    batcher.currentValue.forEach((value, key, map) => fn(key, value, map));
    return batcher;
};
