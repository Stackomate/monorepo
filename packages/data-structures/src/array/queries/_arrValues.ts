import { Batcher } from '../../batcher';



export const _arrValues = <T>(batcher: Batcher<Array<T>>): IterableIterator<T> => {
    return batcher.currentValue.values();
};
