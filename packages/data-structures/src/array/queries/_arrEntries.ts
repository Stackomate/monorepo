import { Batcher } from '../../precompile-output/batcher';



export const _arrEntries = <T>(batcher: Batcher<Array<T>>): IterableIterator<[number, T]> => {
    return batcher.currentValue.entries();
};
