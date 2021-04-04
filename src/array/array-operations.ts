import { useArrayBatcher } from './array-batcher';
import {Batcher} from '../batcher';
import { arrFilterForLocked } from './filter-for-locked';
import { arrFilterForUnlocked } from './filter-for-unlocked';
import { arrMapForLocked } from './map-for-locked';
import { arrMapForUnlocked } from './map-for-unlocked';

/** Returns the index corresponding to an input number.
 * If number >= 0, index will be the number itself.
 * Otherwise, return the index by counting backwards from the end of array.
 * Note that it's possible to return a result < 0, which is technically invalid for arrays.
 */
export const arrIndexAt = <T>(batcher: Batcher<Array<T>>, index: number) : number => {
    if (index >= 0) {
        return index;
    }    
    return batcher.currentValue.length + index;
}

/** Returns the length of the array. */
export const arrLength = <T>(batcher: Batcher<Array<T>>) : number => {
    return batcher.currentValue.length;
}

/** Sets the length of the array.
 * If decreased, will trim the end of the array.
 * If increased, will create voided indexes in the end of the array.
 * It's possible to use negative indexes to count backwards from end of the array.
 * If negative index resolves to an index < 0, final array length will be 0.
 */
export const arrSetLength = <T>(batcher: Batcher<Array<T>>, length: number) : Batcher<Array<T>> => {
    let l = Math.max(arrIndexAt(batcher, length), 0);
    if (arrLength(batcher) !== l) {
        batcher.willChange();
        batcher.currentValue.length = l;
    }
    return batcher;
}

/**
 * Returns last index from the array
 */
export const arrLastIndex = <T>(batcher: Batcher<Array<T>>) : number => {
    return arrLength(batcher) - 1;
}

/**
 * Returns item located in desired array index. 
 * Allows for negative indexes to count backwards from end of the array.
 */
const arrAt = <T>(batcher: Batcher<Array<T>>, index: number) : T => {
    return batcher.currentValue[arrIndexAt(batcher, index)];
}

/**
 * Check whether an array index is not void. Only accepts positive indexes.
 */
const arrPositiveIndexDefined = <T>(batcher: Batcher<Array<T>>, index: number) : boolean => {
    return index in batcher.currentValue;
}

/**
 * Check whether an array index is not void. Negative indexes will count backwards from end of the array.
 */
const arrIndexDefined = <T>(batcher: Batcher<Array<T>>, index: number) : boolean => {
    return arrPositiveIndexDefined(batcher, arrIndexAt(batcher, index));
}

/**
 * Sets an item in the array in the desired index.
 * Negative indexes will count backwards from the end of the array.
 */
export const arrSetIndex = <T>(batcher: Batcher<Array<T>>, index: number, item: T) : Batcher<Array<T>> => {
    const i = arrIndexAt(batcher, index);
    if (batcher.currentValue[i] !== item) {
        batcher.willChange();
        batcher.currentValue[i] = item;
    }
    return batcher;
}

/**
 * Add an item to the end of the array.
 */
export const arrPush = <T>(batcher: Batcher<Array<T>>, item: T) : Batcher<Array<T>> => {
    batcher.willChange();
    batcher.currentValue[arrLength(batcher)] = item;
    return batcher;    
}

/**
 * Reduce the array length until a non-void item is found.
 * This is useful for updating the length after using the delete method.
 */
const arrTrimLength = <T>(batcher: Batcher<Array<T>>) : Batcher<Array<T>> => {
    let i = arrLastIndex(batcher);
    while (!arrPositiveIndexDefined(batcher, i) && (i > 0)) {
        batcher.willChange();
        batcher.currentValue.length = i;
        i = i - 1;
    }
    return batcher;
}

/**
 * Delete item and leave a void in the desired array index.
 * This will not change the array length.
 *  
 */
const arrDel = <T>(batcher: Batcher<Array<T>>, index: number) : Batcher<Array<T>> => {
    let i = arrIndexAt(batcher, index);
    if (arrPositiveIndexDefined(batcher, i)) {
        batcher.willChange();
        delete batcher.currentValue[i];
    }
    return batcher;
}

/* TODO: Create splice */

/**
 * Remove an item from the array in the specified index.
 * Next items will slide back to fill the void from removed item.
 */
const arrRemove = <T>(batcher: Batcher<Array<T>>, index: number) : Batcher<Array<T>> => {
    let i = arrIndexAt(batcher, index);
    if (arrPositiveIndexDefined(batcher, i)) {
        batcher.willChange();
        batcher.currentValue.splice(i, 1);
    }
    return batcher;
}

/**
 * Insert an item into the array in the specified index.
 * Next items will slide forward to make room for added item.
 */
const arrInsert = <T>(batcher: Batcher<Array<T>>, index: number, item: T) : Batcher<Array<T>> => {
    /* TODO: Reuse other functions */
    let i = arrIndexAt(batcher, index);
    if (i >= 0) {
        batcher.willChange();
        batcher.currentValue.splice(index, 0, item);
    }
    return batcher;
}

/** Loop through items of the array and apply a given function to each of them. */
export const arrForEach = <T>(batcher: Batcher<Array<T>>, fn: (a: T, index: number, array: Array<T>) => void) : Batcher<Array<T>> => {
    batcher.currentValue.forEach(fn);
    return batcher;
}


/* TODO: Loosen types in copyArrays to return array of joined types */
/** Copy one or more arrays into a target array */
export const arrSpread = <S>(batcher: Batcher<Array<S>>, copyArrays: Batcher<Array<S>>[]) : Batcher<Array<S>> => {
    copyArrays.forEach(b => {
        arrForEach(b, item => {
            arrPush(batcher, item);
        })
    })
    return batcher;
}

/* Note: Filter will use a new array for the batcher's currentValue */
export const arrFilter = <T>(batcher: Batcher<Array<T>>, fn: (a: T) => boolean) : Batcher<Array<T>> => {
    if (batcher.isUnlocked) {
        return arrFilterForUnlocked(batcher, fn);
    }
    return arrFilterForLocked<T>(batcher, fn);
}

export const arrMap = <T, U>(batcher: Batcher<Array<T>>, fn: (a: T) => U) : Batcher<Array<U>> => {
    if (batcher.isUnlocked) {
        return arrMapForUnlocked(batcher, fn);
    }
    return arrMapForLocked(batcher, fn);    
}