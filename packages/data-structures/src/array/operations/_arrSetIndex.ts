import { Batcher } from '../../precompile-output/batcher';
import { _arrIndexAt } from '../queries/_arrIndexAt';

/**
 * Sets an item in the array in the desired index.
 * Negative indexes will count backwards from the end of the array.
 */

export const _arrSetIndex = <T>(batcher: Batcher<Array<T>>, index: number, item: T): Batcher<Array<T>> => {
    const i = _arrIndexAt(batcher, index);
    let initialValue = batcher.currentValue
    if (
        initialValue[i] !== item
        ||
        /* It may be possible to define undefined in an empty index slot */
        !(i in initialValue)         
    ) {
        batcher.willChange();
        batcher.currentValue[i] = item;
    }
    return batcher;
};
