import { Batcher } from '../../precompile-output/batcher';
import { _arrIndexAt } from '../queries/_arrIndexAt';
import { _arrIndexNotVoid } from '../queries/_arrPositiveIndexDefined';

/**
 * Delete item and leave a void in the desired array index.
 * This will not change the array length.
 *
 */
export const _arrDel = <T>(batcher: Batcher<Array<T>>, index: number): Batcher<Array<T>> => {
    let i = _arrIndexAt(batcher, index);
    if (_arrIndexNotVoid(batcher, i)) {
        batcher.willChange();
        delete batcher.currentValue[i];
    }
    return batcher;
};
