import { Batcher } from '../../precompile-output/batcher';
import { _arrSetIndex } from './_arrSetIndex';

export const _arrCopyLeft = <T>(batcher: Batcher<Array<T>>, array: T[], startIndex: number, slideLeft: number = 1) => {
    for (let i = startIndex; i < array.length; i++) {
        _arrSetIndex(batcher, i - slideLeft, array[i]);
    }
    return batcher;
};