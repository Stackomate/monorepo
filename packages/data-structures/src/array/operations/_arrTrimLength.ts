import { Batcher } from '../../precompile-output/batcher';
import { isUnlocked } from '../../utils';
import { _arrLastIndex } from '../queries/_arrLastIndex';
import { _arrIndexNotVoid } from '../queries/_arrPositiveIndexDefined';

/**
 * Reduce the array length until a non-void item is found.
 * This is useful for updating the length after using the delete method.
 */

export const _arrTrimLength = <T>(batcher: Batcher<Array<T>>): Batcher<Array<T>> => {
    let i = _arrLastIndex(batcher);
    let initialLength = batcher.currentValue.length;
    let finalLength = batcher.currentValue.length;

    while (!_arrIndexNotVoid(batcher, i) && (i >= 0)) {
        finalLength = i;
        i = i - 1;
    }
    if (finalLength !== initialLength) {
        batcher.willChange({to: finalLength - 1});
        /* The line below is necessary for unlocked batchers,
        since they will not be cloned and need their length updated */
        if (isUnlocked(batcher)) {
            batcher.currentValue.length = finalLength;
        }
    }
    return batcher;
};
