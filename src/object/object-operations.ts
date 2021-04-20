import { Batcher } from '../batcher';

export const _objHas = <T extends Object>(batcher: Batcher<T>, key: keyof T ): boolean => {
    return batcher.currentValue.hasOwnProperty(key);
}

export const _objGet = <T extends Object, K extends keyof T>(batcher: Batcher<T>, key: K): T[K] => {
    return batcher.currentValue[key];
}

export const _objSet = <T extends Object>(batcher: Batcher<T>, key: keyof T): T => {
    if (!_objHas(batcher, key) || _objGet(batcher, key) !== batcher.currentValue[key]) {
        batcher.willChange();
        batcher.currentValue[key] = _objGet(batcher, key);
    }
    return batcher.currentValue;
}