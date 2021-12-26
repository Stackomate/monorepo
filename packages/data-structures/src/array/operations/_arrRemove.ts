import { Batcher } from '../../batcher';
import { _arrIndexAt } from '../queries/_arrIndexAt';
import { _arrPositiveIndexDefined } from '../queries/_arrPositiveIndexDefined';

/* TODO: Create splice */
/**
 * Remove an item from the array in the specified index.
 * Next items will slide back to fill the void from removed item.
 */

export const _arrRemove = <T>(batcher: Batcher<Array<T>>, index: number): Batcher<Array<T>> => {
    let i = _arrIndexAt(batcher, index);
    if (_arrPositiveIndexDefined(batcher, i)) {
        /* TODO: Optimize with will change without cloning */
        batcher.willChange();
        batcher.currentValue.splice(i, 1);
    }
    return batcher;
};
