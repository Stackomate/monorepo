import { arrRemove } from '..';
import { Batcher } from '../../batcher';
import { _arrIndexAt } from '../queries/_arrIndexAt';
import { _arrCopyRight } from "./_arrCopyRight";
import { _arrSetIndex } from './_arrSetIndex';

/**
 * Insert an item into the array in the specified index.
 * Next items will slide forward to make room for added item.
 * Supports positive indexes out of array length, and negative indexes within the array range
 */
export const _arrShift = <T>(batcher: Batcher<Array<T>>): Batcher<Array<T>> => {
    return batcher.run(
        arrRemove(0)
    );
};
