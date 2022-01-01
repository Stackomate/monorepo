import { Batcher } from '../../batcher';


export const _objClear = <T extends Object>(batcher: Batcher<T>): Batcher<T> => {
    batcher.willChangeWithoutCloning();
    batcher.currentValue = {} as T;

    return batcher;
};
