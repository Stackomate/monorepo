import { Batcher } from '../../precompile-output/batcher';

export type ObjForEachFn<T extends Object> = (key: keyof T, value: T[keyof T], obj: T) => void;
export const _objForEach = <T extends Object>(batcher: Batcher<T>, fn: ObjForEachFn<T>): Batcher<T> => {
    let obj = batcher.currentValue;
    /* Inverted ordering of key, value arguments */
    Object.keys(obj).forEach(key => fn(key as keyof T, obj[key as keyof T], obj));

    return batcher;
};
