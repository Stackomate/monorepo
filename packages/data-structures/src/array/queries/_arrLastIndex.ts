import { Batcher } from '../../batcher';
import { _arrLength } from './_arrLength';

/**
 * Returns last index from the array
 */

export const _arrLastIndex = <T>(batcher: Batcher<Array<T>>): number => {
    return _arrLength(batcher) - 1;
};
