import { useArrayBatcher } from './array-batcher';
import {Batcher} from '../batcher';
import { arrFilterForLocked } from './filter-for-locked';
import { arrFilterForUnlocked } from './filter-for-unlocked';
import { arrMapForLocked } from './map-for-locked';
import { arrMapForUnlocked } from './map-for-unlocked';
import { forEachYield } from './for-each-yield';

/** Returns the index corresponding to an input number.
 * If number >= 0, index will be the number itself.
 * Otherwise, return the index by counting backwards from the end of array.
 * Note that it's possible to return a result < 0, which is technically invalid for arrays.
 */
export const _arrIndexAt = <T>(batcher: Batcher<Array<T>>, index: number) : number => {
    if (index >= 0) {
        return index;
    }    
    return batcher.currentValue.length + index;
}

/** Returns the length of the array. */
export const _arrLength = <T>(batcher: Batcher<Array<T>>) : number => {
    return batcher.currentValue.length;
}

/** Sets the length of the array.
 * If decreased, will trim the end of the array.
 * If increased, will create voided indexes in the end of the array.
 * It's possible to use negative indexes to count backwards from end of the array.
 * If negative index resolves to an index < 0, final array length will be 0.
 */
export const _arrSetLength = <T>(batcher: Batcher<Array<T>>, length: number) : Batcher<Array<T>> => {
    let l = Math.max(_arrIndexAt(batcher, length), 0);
    if (_arrLength(batcher) !== l) {
        batcher.willChange();
        batcher.currentValue.length = l;
    }
    return batcher;
}

/**
 * Returns last index from the array
 */
export const _arrLastIndex = <T>(batcher: Batcher<Array<T>>) : number => {
    return _arrLength(batcher) - 1;
}

/**
 * Returns item located in desired array index. 
 * Allows for negative indexes to count backwards from end of the array.
 */
export const _arrAt = <T>(batcher: Batcher<Array<T>>, index: number) : T => {
    return batcher.currentValue[_arrIndexAt(batcher, index)];
}

/**
 * Check whether an array index is not void. Only accepts positive indexes.
 */
export const _arrPositiveIndexDefined = <T>(batcher: Batcher<Array<T>>, index: number) : boolean => {
    return index in batcher.currentValue;
}

/**
 * Check whether an array index is not void. Negative indexes will count backwards from end of the array.
 */
export const _arrIndexDefined = <T>(batcher: Batcher<Array<T>>, index: number) : boolean => {
    return _arrPositiveIndexDefined(batcher, _arrIndexAt(batcher, index));
}

/**
 * Sets an item in the array in the desired index.
 * Negative indexes will count backwards from the end of the array.
 */
export const _arrSetIndex = <T>(batcher: Batcher<Array<T>>, index: number, item: T) : Batcher<Array<T>> => {
    const i = _arrIndexAt(batcher, index);
    if (batcher.currentValue[i] !== item) {
        batcher.willChange();
        batcher.currentValue[i] = item;
    }
    return batcher;
}

/**
 * Add an item to the end of the array.
 */
export const _arrPush = <T>(batcher: Batcher<Array<T>>, item: T) : Batcher<Array<T>> => {
    batcher.willChange();
    batcher.currentValue[_arrLength(batcher)] = item;
    return batcher;    
}

/**
 * Reduce the array length until a non-void item is found.
 * This is useful for updating the length after using the delete method.
 */
export const _arrTrimLength = <T>(batcher: Batcher<Array<T>>) : Batcher<Array<T>> => {
    let i = _arrLastIndex(batcher);
    /* TODO: Optimize */
    while (!_arrPositiveIndexDefined(batcher, i) && (i >= 0)) {
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
export const _arrDel = <T>(batcher: Batcher<Array<T>>, index: number) : Batcher<Array<T>> => {
    let i = _arrIndexAt(batcher, index);
    if (_arrPositiveIndexDefined(batcher, i)) {
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
export const _arrRemove = <T>(batcher: Batcher<Array<T>>, index: number) : Batcher<Array<T>> => {
    let i = _arrIndexAt(batcher, index);
    if (_arrPositiveIndexDefined(batcher, i)) {
        /* TODO: Optimize with will change without cloning */
        batcher.willChange();
        batcher.currentValue.splice(i, 1);
    }
    return batcher;
}

/**
 * Insert an item into the array in the specified index.
 * Next items will slide forward to make room for added item.
 */
export const _arrInsert = <T>(batcher: Batcher<Array<T>>, index: number, item: T) : Batcher<Array<T>> => {
    /* TODO: Reuse other functions */
    let i = _arrIndexAt(batcher, index);   
    if (i >= 0) {
        batcher.willChange();
        if(i > batcher.currentValue.length - 1){
            batcher.currentValue.length = i;
        }
        batcher.currentValue.splice(index, 0, item);
    }
    return batcher;
}


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
export const _arrForEach = <T>(batcher: Batcher<Array<T>>, fn: (a: T, index: number, array: Array<T>) => void) : Batcher<Array<T>> => {
    batcher.currentValue.forEach(fn);
    return batcher;
}

export const BREAK = Symbol('BREAK');

/** Similar to _arrForEach, but allows the loop to break by returning BREAK symbol.
 * This is similar to for of with _arrIteratorForEach, by has the limitation of not being able to stop the main function execution from within the callback function.
 */
export const _arrForEachWithBreak = <T>(batcher: Batcher<Array<T>>, fn: (a: T, index: number, array: Array<T>) => void | typeof BREAK) : Batcher<Array<T>> => {
    for (let [item, index, arr] of _arrIteratorForEach(batcher)) {
        let result = fn(item, index, arr);
        if (result === BREAK) {
            return batcher;
        } 
    }
    return batcher;
}

/** Similar to _arrForEachWithBreak, but returns a summary of what happened inside of the array
 */
export const _arrForEachWithBreakAndSummary = <T>(batcher: Batcher<Array<T>>, fn: (a: T, index: number, array: Array<T>) => void | typeof BREAK) : [Batcher<Array<T>>, {success: true} | {success: false, item: T, index: number, arr: T[]}] => {
    for (let [item, index, arr] of _arrIteratorForEach(batcher)) {
        let result = fn(item, index, arr);
        if (result === BREAK) {
            return [batcher, {success: false, item, index, arr}];
        } 
    }
    return [batcher, {success: true}];
}


/* TODO: Loosen types in copyArrays to return array of joined types */
/** Copy one or more arrays into a target array */
export const _arrSpread = <S>(batcher: Batcher<Array<S>>, copyArrays: Batcher<Array<S>>[]) : Batcher<Array<S>> => {
    copyArrays.forEach(b => {
        _arrForEach(b, item => {
            _arrPush(batcher, item);
        })
    })
    return batcher;
}

/* Note: Filter will use a new array for the batcher's currentValue */
export const _arrFilter = <T>(batcher: Batcher<Array<T>>, fn: (a: T) => boolean) : Batcher<Array<T>> => {
    if (batcher.isUnlocked) {
        return arrFilterForUnlocked(batcher, fn);
    }
    return arrFilterForLocked<T>(batcher, fn);
}

export const _arrMap = <T, U>(batcher: Batcher<Array<T>>, fn: (a: T) => U) : Batcher<Array<U>> => {
    if (batcher.isUnlocked) {
        return arrMapForUnlocked(batcher, fn);
    }
    return arrMapForLocked(batcher, fn);    
}

export const _arrEntries = <T>(batcher: Batcher<Array<T>>) : IterableIterator<[number, T]> => {
    return batcher.currentValue.entries();
}

export const _arrValues = <T>(batcher: Batcher<Array<T>>) : IterableIterator<T> => {
    return batcher.currentValue.values();
}

export const _arrIterator = _arrValues;

/* 2 differences: does not include empty indexes, and maybe should not loop forever (only includes initial items?) */

/* forEach stops in the length of the original array */
/* TODO: Use the polyfill and add yield for the fn call (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Modifying_the_array_during_iteration) */
export const _arrIteratorForEach = <T>(batcher: Batcher<Array<T>>) : IterableIterator<[T, number, T[]]> => {
    return forEachYield(batcher.currentValue);
}
/* TODO: Compare this with set foreach https://tc39.es/ecma262/#sec-set.prototype.foreach */

/* If you choose forEach iterator, the loop is guaranteed to stop and will skip empty slots in the array. Otherwise, default iterator will be used */
/* TODO: Create function maybe stop, that stops batcher steps similar to a return statement */
/* TODO: BATCHER SHOULD BE A FUNCTION THAT STORES THE CLASS AS A PROPERTY? Performance issues vs flexibility */
// https://stackoverflow.com/questions/36871299/how-to-extend-function-with-es6-classes
// https://stackoverflow.com/questions/19335983/can-you-make-an-object-callable
/* Notice that forEach traverses only defined keys, while for of does not */
/* 

maybeContinue/shouldContinue or maybeReturn/shouldReturn
ifElse()

return maybeUpdate() || maybeInsert()

b.run(
    breakOnReturn(
        arrForEachWithBreak((item, index, arr) => {
                if (findOne(item, index, arr)) {
                    _arrSetIndex(b, index, fn(item, index, arr))
                    return BREAK;
                }
        }),
        
        pass(() => {
            batcher;
        })
    )
)

OR 

    for (let item of _arrIterate(batcher)) { //iterate needs to be like forEach, not like default forOf
        if (findOne(item, index, arr)) {
            _arrSetIndex(batcher, index, fn(item, index, arr))
            return batcher;
        }
    });

    _arrPush(batcher, fallback(_arrLength(batcher), batcher.currentValue));
    return batcher;

OR

    let [stopped, b] = _arrMaybeForEach(batcher, (item, index, arr) => {
        if (findOne(item, index, arr)) {
            _arrSetIndex(batcher, index, fn(item, index, arr))
            return false;
        }
    });

    if (stopped) batcher;

    _arrPush(batcher, fallback(_arrLength(batcher), batcher.currentValue));
    return batcher;

*/

/* Find traverses empty slots */
export const _arrFind = <T>(batcher: Batcher<Array<T>>, fn: (item: T, index: number, array: Array<T>) => boolean) => {
    return batcher.currentValue.find(fn);
}

export const _arrFindWithForEach = <T>(batcher: Batcher<Array<T>>, fn: (item: T, index: number, array: Array<T>) => boolean) => {
    for (let [item, index, arr] of _arrIteratorForEach(batcher)) {
        if (fn(item, index, arr)) {
            return item;
        }
    }
    return undefined;
}



/* TODO: Add option for function to include empty slots */
/**
 * Attempt to find the first element that satifisfies the condition and apply a function to it.
 * If not found, fallback to result of fallback function.
 * Unline _arrUpsertWithFind, this method uses the forEach iterator, which always finishes and skips empty slots
 * @param batcher 
 * @param findOne 
 * @param fn 
 * @param fallback 
 * @returns 
 */
export const _arrUpsertWithFindWithForEach = <T>(
    batcher: Batcher<Array<T>>, 
    findOne: (item: T, index: number, array: Array<T>) => boolean,
    fn: (item: T, index: number, array: Array<T>) => T, 
    fallback: (index: number, array: Array<T>) => T
) => {
    for (let [item, index, arr] of _arrIteratorForEach(batcher)) {
        if (findOne(item, index, arr)) {
            _arrSetIndex(batcher, index, fn(item, index, arr))
            return batcher;
        }
    };

    _arrPush(batcher, fallback(_arrLength(batcher), batcher.currentValue));
    return batcher;
}

export const _arrUpsertWithFind = <T>(
    batcher: Batcher<Array<T>>, 
    findOne: (item: T, index: number, array: Array<T>) => boolean,
    fn: (item: T, index: number, array: Array<T>) => T, 
    fallback: (index: number, array: Array<T>) => T
) => {
    let arr = batcher.currentValue;
    for (let [index, item] of _arrEntries(batcher)) {
        if (findOne(item, index, arr)) {
            _arrSetIndex(batcher, index, fn(item, index, arr))
            return batcher;
        }
    };

    _arrPush(batcher, fallback(_arrLength(batcher), batcher.currentValue));
    return batcher;
}

export const _arrUpsert =  <T>(
    batcher: Batcher<Array<T>>, 
    item: T,
    fn: (item: T, index: number, array: Array<T>) => T, 
    fallback: (index: number, array: Array<T>) => T,
    useDefaultIterator: boolean = true
) => {
    return (useDefaultIterator ? _arrUpsertWithFind : _arrUpsertWithFindWithForEach) (batcher, (i) => i === item, fn, fallback);
}