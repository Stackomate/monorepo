import { Batcher } from '../../batcher';

/**
 * Check whether an array index is not void. Only accepts positive indexes.
 */

export const _arrIndexNotVoid = <T>(batcher: Batcher<Array<T>>, index: number): boolean => {
    return index in batcher.currentValue;
};
