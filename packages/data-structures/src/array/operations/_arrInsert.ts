import { Batcher } from '../../precompile-output/batcher';
import { _arrIndexAt } from '../queries/_arrIndexAt';
import { _arrCopyRight } from "./_arrCopyRight";
import { _arrSetIndex } from './_arrSetIndex';

/**
 * Insert an item into the array in the specified index.
 * Next items will slide forward to make room for added item.
 * Supports positive indexes out of array length, and negative indexes within the array range
 */
export const _arrInsert = <T>(batcher: Batcher<Array<T>>, index: number, item: T): Batcher<Array<T>> => {
    /* Resolve index where item will be added */
    let i = _arrIndexAt(batcher, index);
    if (i >= 0) {

        let source = batcher.currentValue;        
        /* Use partial clone up to previous item */
        batcher.willChange({to: i - 1});

        /* If index is not defined in the current array,
        enlarge it until it's possible to add new item */
        if (i > batcher.currentValue.length - 1) {
            batcher.currentValue.length = i;
        }

        /* Shifting next items to the right by copying them.
        Another option could be to batcher.currentValue.splice(index, 0, item); */
        _arrCopyRight(batcher, source, i);

        /* Add item to index selected */
        _arrSetIndex(batcher, i, item);
    }
    return batcher;
};
