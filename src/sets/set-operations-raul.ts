import { Batcher, value } from '../batcher';
//import { setMapForUnlocked } from "/home/raul/Desktop/stackomate/data-structures/src/sets/map-for-locked;
import { setFilterForLocked } from './filter-for-locked';
import { setFilterForUnlocked } from './filter-for-unlocked';
import { useSetBatcher } from "../set-batcher";

//TODO: make a size for batchers of sets

//ok
export const _setIsEmpty = <T>(batcher: Batcher<Set<T>>): boolean =>{
    return batcher.currentValue.size === 0
};

//ok
export const _setHas = <T>(batcher: Batcher<Set<T>>, item: T): boolean =>{
    return batcher.currentValue.has(item);
}

// //TODO: see with Rafael if this method needs to be tested
// export const _setIterate = <T>(set: Batcher<Set<T>>, item: T) =>{
//     _setForEach(set, (value) => console.log(value));
// }

//ok
export const _setEquals = <T>(set1: Batcher<Set<T>>, set2: Set<T>): boolean =>{
    if(set1.currentValue === set2 )
        return true;
    if(set1.currentValue.size !== set2.size)
        return false;
    for (const value1 of set1.currentValue) {
        if(!set2.has(value1))
          return false;
    }
    return true;
}

//ok
export const _setAdd = <T>(set: Batcher<Set<T>>, item: T): Batcher<Set<T>> =>{
    if (!set.currentValue.has(item)) {
        set.willChange();
        set.currentValue.add(item);
    }
    return set;
}

//ok
export const _setUnion = <T>(set: Batcher<Set<T>>, set2:Set<T>): Batcher<Set<T>> => {
    set2.forEach(value => {
        _setAdd(set, value);
    });
    return set;
}

//ok
export const _setRemove = <T>(set: Batcher<Set<T>>, item: T): Batcher<Set<T>> => {
    if (set.currentValue.has(item)) {
        set.willChange();
        set.currentValue.delete(item);
    }
    return set;
}
//TODO left difference and right difference
export const _setDifference = <T>(set1: Batcher<Set<T>>, set2: Set<T>): Batcher<Set<T>> => {
    // set1.currentValue.forEach(value => {
    //     _setRemove(set1, value);
    // });
    set2.forEach(value => {
        _setRemove(set1, value);
    });
    return set1;
}

//ok
export const _setIntersection = <T>(set1: Batcher<Set<T>>, set2: Set<T>): Batcher<Set<T>> => {

    if(set1.currentValue.size <= set2.size) {
        set1.currentValue.forEach(value => {
            if(!set2.has(value)){
                _setRemove(set1, value);
            }
        });
    }
    else{
        let newTarget : Batcher<Set<T>> = useSetBatcher(set2);
        newTarget.currentValue.forEach(value => {
            if(!_setHas(set1, value)){
                _setRemove(newTarget, value);
            }
            if (!newTarget.hasChanged) {
                set1.lock();
            }
        });
        set1.willChangeWithoutCloning();
        set1.currentValue = newTarget.currentValue;
    }
    return set1;
}



const _setOrder = <T>(batcher: Batcher<Set<T>>, ...sets: Set<T>[]): Set<T>[] =>{
    let arr: Set<T>[] = [...sets];
    return arr.sort((a, b) => (a.size > b.size) ? 1 : -1);
}

//TODO: make a stop point after found a false value
export const _setDisjoint = <T>(set1: Batcher<Set<T>>, set2: Set<T>): boolean => {
    return _setIntersection(set1, set2).currentValue.size === 0
}

//ok
export const _isSubSet = <T>(set1: Batcher<Set<T>>, set2: Set<T>): boolean => {
    //a bigger set cant be a sub set of a smaller set
    if(set1.currentValue.size > set2.size)
        return false;
    
    for (const value of set1.currentValue) {
        if(!set2.has(value))
          return false;
    }
    return true;
}

//ok
export const _isSuperSet = <T>(set1: Batcher<Set<T>>, set2: Set<T>): boolean => {
    //a smaller set cant be a super set of a bigger set
    if(set1.currentValue.size < set2.size)
        return false;

    for (const value of set2) {
        if(!set1.currentValue.has(value))
            return false;
    }
    return true;
}

//ok
export const _setSymmetricDifference = <T>(set1: Batcher<Set<T>>, set2: Set<T>): Batcher<Set<T>> => {
    let biggerSet = set1;
    let smallerSet = set2;
    
    if(biggerSet.currentValue.size < smallerSet.size){
        let auxSet = smallerSet;

        smallerSet = biggerSet.currentValue;
        biggerSet.currentValue = auxSet;
        biggerSet.lock();
    }

    smallerSet.forEach(value => {
        if(!_setHas(biggerSet, value)){
            _setAdd(biggerSet, value);  
        }
        else{
            _setRemove(biggerSet, value);
        }
    });
    return biggerSet;
}

//ok
export const _setEvery = <T>(set: Batcher<Set<T>>, fn: (a: T) => boolean): boolean => {
    for (let value of set.currentValue) {
        if(!fn(value)){
            return false;
        }
    };
    return true;
}

//ok
export const _setForEach = <T>(batcher: Batcher<Set<T>>, fn: (value: T, set: Set<T>) => void) : Batcher<Set<T>> => {
    batcher.currentValue.forEach((value, b, set) => fn (value, set));
    return batcher;
}

//ok
//TODO: setMapForUnlocked and setMapForLocked
export const _setMap = <T,V>(batcher: Batcher<Set<T>>, fn: (value: T, set: Set<T>) => V) : Batcher<Set<V>> => {
    /* TODO: Add full [key, value] pair check for rare scenario */
    const result : Set<V> = new Set();
    let hasAdded = false;
    _setForEach(batcher, (value, set) => {
        let newValue = fn( value, set);
        result.add(newValue);
        if (!_setHas(batcher, newValue as unknown as T)) {
            hasAdded = true;
        }
    })
    let batcher_ = batcher as unknown as Batcher<Set<V>>;    
    if (hasAdded || result.size !== batcher_.currentValue.size) {
        batcher_.willChange();
        batcher_.currentValue = result;
    }
    return batcher_;
}

//TODO: verify with Rafael
export const _setFind = <T>(batcher: Batcher<Set<T>>, fn: (value: T) => boolean): any => {
    for(let item of batcher.currentValue){
        if(fn(item as unknown as T)){
            return item as unknown as T;
        }
    }
}

// export const _setProductCartesian = <T>(batcher: Batcher<Set<T>>, set: Set<T>): Batcher<Set<T>> => {
//     let batcher_ = batcher;
//     const result: Set<T> = new Set();
//     batcher.currentValue.forEach(element => {
//         set.forEach(elementSet => {
//             result.add([element, elementSet]);
//         });
//     });
//     batcher.willChange();
//     batcher_.currentValue = result; 
//     return batcher_;
// }

export type FilterFn<T> = (value: T, set: Set<T>) => boolean

export const _setFilter = <T>(batcher: Batcher<Set<T>>, fn: FilterFn<T>) : Batcher<Set<T>> => {
    if (batcher.isUnlocked) {
        return setFilterForUnlocked(batcher, fn);
    }
    return setFilterForLocked(batcher, fn);
}
