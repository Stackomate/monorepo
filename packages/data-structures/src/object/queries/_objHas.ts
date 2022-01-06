import { Batcher } from '../../precompile-output/batcher';


export const _objHas = <T extends Object>(batcher: Batcher<T>, key: keyof T): boolean => {
    return batcher.currentValue.hasOwnProperty(key);
};
