import { Batcher } from '../../batcher';
import { _arrIndexAt } from '../queries/_arrIndexAt';

/**
 * Insert an item into the array in the specified index.
 * Next items will slide forward to make room for added item.
 */
export const _arrInsert = <T>(batcher: Batcher<Array<T>>, index: number, item: T): Batcher<Array<T>> => {
    /* Resolve index where item will be added */
    let i = _arrIndexAt(batcher, index);
    if (i >= 0) {
        batcher.willChange();

        /* If index is not defined in the current array,
        enlarge it until it's possible to add new item */
        if (i > batcher.currentValue.length - 1) {
            batcher.currentValue.length = i;
        }

        /* Add item at position while also shifting next items to the right */
        batcher.currentValue.splice(index, 0, item);
    }
    return batcher;
};
