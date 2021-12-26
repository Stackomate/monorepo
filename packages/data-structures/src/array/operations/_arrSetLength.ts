import { Batcher } from '../../batcher';
import { _arrIndexAt } from '../queries/_arrIndexAt';
import { _arrLength } from '../queries/_arrLength';

/** Sets the length of the array.
 * If decreased, will trim the end of the array.
 * If increased, will create voided indexes in the end of the array.
 * It's possible to use negative indexes to count backwards from end of the array.
 * If negative index resolves to an index < 0, final array length will be 0.
 */

export const _arrSetLength = <T>(batcher: Batcher<Array<T>>, length: number): Batcher<Array<T>> => {
    let l = Math.max(_arrIndexAt(batcher, length), 0);
    if (_arrLength(batcher) !== l) {
        batcher.willChange();
        batcher.currentValue.length = l;
    }
    return batcher;
};
