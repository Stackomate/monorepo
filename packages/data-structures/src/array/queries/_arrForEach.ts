import { Batcher } from '../../batcher';

/* IMPORTANT: There are differences between forEach and for of */
/*
let arr = [1, 2, 3]
arr.forEach(i => arr.push(i + 2))

let arr = [1, 2, 3]
for (let i of arr) {
    arr.push(i + 2)
}

*/
/** Loop through items of the array and apply a given function to each of them. */

export const _arrForEach = <T>(batcher: Batcher<Array<T>>, fn: (a: T, index: number, array: Array<T>) => void): Batcher<Array<T>> => {
    batcher.currentValue.forEach(fn);
    return batcher;
};

export const BREAK = Symbol('BREAK');
