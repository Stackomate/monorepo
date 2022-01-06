import { Batcher } from '../../precompile-output/batcher';

/* Find traverses empty slots */
export const _arrFind = <T>(batcher: Batcher<Array<T>>, fn: (item: T, index: number, array: Array<T>) => boolean) => {
    return batcher.currentValue.find(fn);
};
