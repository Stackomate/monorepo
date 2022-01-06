import { Batcher } from '../../precompile-output/batcher';
import { _arrIndexAt } from '../queries/_arrIndexAt';
import { _arrIndexInRange } from '../queries/_arrIndexInRange';
import { _arrIndexNotVoid } from '../queries/_arrPositiveIndexDefined';
import { _arrCopyLeft } from './_arrCopyLeft';

/* TODO: Create splice */
/**
 * Remove an item from the array in the specified index.
 * Next items will slide back to fill the void from removed item.
 * Empty slots will also be removed. 
 * Positive indexes are supported up to array's length - 1
 * Negative indexes are supported within the array range
 */
export const _arrRemove = <T>(batcher: Batcher<Array<T>>, index: number): Batcher<Array<T>> => {
    let i = _arrIndexAt(batcher, index);
    
    if (_arrIndexInRange(batcher, i)) {
        /* Optimized with will change without cloning */
        /* Should only copy until index - 1 */
        /* We need to save the source (previous array), in case cloning happens */
        let source = batcher.currentValue;
        batcher.willChange({to: i - 1});
        /* Copy items after removed item by shifting left */
        _arrCopyLeft(batcher, source, i + 1);

        /* TODO: Compare performance from implementation above against splice implementation */

        /* Remove last item if array copied from itself (was already unlocked) */
        let latestValue = batcher.currentValue
        if (source === latestValue) {
            latestValue.length = latestValue.length - 1;
        }

    }
    return batcher;
};
