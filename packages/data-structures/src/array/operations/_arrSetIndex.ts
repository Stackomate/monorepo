import { Batcher } from '../../batcher';
import { _arrIndexAt } from '../queries/_arrIndexAt';

/**
 * Sets an item in the array in the desired index.
 * Negative indexes will count backwards from the end of the array.
 */

export const _arrSetIndex = <T>(batcher: Batcher<Array<T>>, index: number, item: T): Batcher<Array<T>> => {
    const i = _arrIndexAt(batcher, index);
    if (batcher.currentValue[i] !== item) {
        batcher.willChange();
        batcher.currentValue[i] = item;
    }
    return batcher;
};
