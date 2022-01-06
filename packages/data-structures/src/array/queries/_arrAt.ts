import { Batcher } from '../../precompile-output/batcher';
import { _arrIndexAt } from './_arrIndexAt';

/**
 * Returns item located in desired array index.
 * Allows for negative indexes to count backwards from end of the array.
 */

export const _arrAt = <T>(batcher: Batcher<Array<T>>, index: number): T => {
    return batcher.currentValue[_arrIndexAt(batcher, index)];
};
