import { Batcher } from '../batcher';

// ok

export const _setForEach = <T>(batcher: Batcher<Set<T>>, fn: (value: T, set: Set<T>) => void): Batcher<Set<T>> => {
    batcher.currentValue.forEach((value, b, set) => fn(value, set));
    return batcher;
};
