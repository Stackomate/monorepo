import { Batcher } from '../../batcher';
import { _arrLastIndex } from '../queries/_arrLastIndex';
import { _arrPositiveIndexDefined } from '../queries/_arrPositiveIndexDefined';

/**
 * Reduce the array length until a non-void item is found.
 * This is useful for updating the length after using the delete method.
 */

export const _arrTrimLength = <T>(batcher: Batcher<Array<T>>): Batcher<Array<T>> => {
    let i = _arrLastIndex(batcher);
    /* TODO: Optimize */
    while (!_arrPositiveIndexDefined(batcher, i) && (i >= 0)) {
        batcher.willChange();
        batcher.currentValue.length = i;
        i = i - 1;
    }
    return batcher;
};
