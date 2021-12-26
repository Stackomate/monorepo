import { Batcher } from '../../batcher';
import { _arrIndexAt } from './_arrIndexAt';
import { _arrPositiveIndexDefined } from './_arrPositiveIndexDefined';

/**
 * Check whether an array index is not void. Negative indexes will count backwards from end of the array.
 */

export const _arrIndexDefined = <T>(batcher: Batcher<Array<T>>, index: number): boolean => {
    return _arrPositiveIndexDefined(batcher, _arrIndexAt(batcher, index));
};
