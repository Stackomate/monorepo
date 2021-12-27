import { Batcher } from '../../batcher';
import { _arrLength } from './_arrLength';

/**
 * Check if a given index is in the range of the array. 
 * Negative values and values greater than the array's length - 1 are excluded
 */
export const _arrIndexInRange = <T>(batcher: Batcher<Array<T>>, index: number): boolean => {
    return (index >= 0) && (index < _arrLength(batcher));
};
