import { Batcher } from '../../batcher';
import { _arrIndexAt } from '../queries/_arrIndexAt';

/**
 * Insert an item into the array in the specified index.
 * Next items will slide forward to make room for added item.
 */

export const _arrInsert = <T>(batcher: Batcher<Array<T>>, index: number, item: T): Batcher<Array<T>> => {
    /* TODO: Reuse other functions */
    let i = _arrIndexAt(batcher, index);
    if (i >= 0) {
        batcher.willChange();
        if (i > batcher.currentValue.length - 1) {
            batcher.currentValue.length = i;
        }
        batcher.currentValue.splice(index, 0, item);
    }
    return batcher;
};
