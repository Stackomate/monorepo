import { Batcher } from '../../batcher';
import { _arrSetIndex } from './_arrSetIndex';


export const _arrCopyRight = <T>(batcher: Batcher<Array<T>>, array: T[], endIndex: number, slideRight: number = 1) => {
    for (let i = array.length - 1; i >= endIndex; i--) {
        _arrSetIndex(batcher, i + slideRight, array[i]);
    }
    return batcher;
};
