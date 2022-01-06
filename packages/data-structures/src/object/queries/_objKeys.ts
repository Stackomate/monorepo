import { Batcher } from '../../precompile-output/batcher';


export const _objKeys = <T extends Object>(batcher: Batcher<T>): string[] => {
    return Object.keys(batcher.currentValue);
};
