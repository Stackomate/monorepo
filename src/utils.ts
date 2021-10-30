import { Batcher } from "./batcher";

//TODO: create a swap method;

export const toValues = <T>(batcher: Batcher<T>[]): T[] => {
    let arr: T[] = [];
    for (let value of batcher) {
        arr.push(value.currentValue);
    }
    return arr;
};

export const fromValues = <T>(arr: T[], fn: (value: T) => Batcher<T>): Batcher<T>[] => {
    let arrBatcher: Batcher<T>[] = [];
    arr.forEach(element => {
        arrBatcher.push(fn(element));
    });
    return arrBatcher;
};

export const forkAndLock = <T>(batcher: Batcher<T>): Batcher<T> => {
    batcher.lock();
    return new Batcher(batcher.currentValue, false, batcher.cloneFn);
};

export const value = <T>(batcher: Batcher<T>): T => {
    return batcher.currentValue;
};

export const hasChanged = <T>(batcher: Batcher<T>): boolean => {
    return batcher.hasChanged;
}

export const cloneValue = <T>(batcher: Batcher<T>): T => {
    return batcher.cloneFn(value(batcher));
};
