import { Batcher } from '../../precompile-output/batcher';

/** Returns the index corresponding to an input number.
 * If number >= 0, index will be the number itself.
 * Otherwise, return the index by counting backwards from the end of array.
 * Note that it's possible to return a result < 0, which is technically invalid for arrays.
 */

export const _arrIndexAt = <T>(batcher: Batcher<Array<T>>, index: number): number => {
    if (index >= 0) {
        return index;
    }
    return batcher.currentValue.length + index;
};
