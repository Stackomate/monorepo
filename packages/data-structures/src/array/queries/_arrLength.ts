import { Batcher } from '../../precompile-output/batcher';

/** Returns the length of the array. */

export const _arrLength = <T>(batcher: Batcher<Array<T>>): number => {
    return batcher.currentValue.length;
};
