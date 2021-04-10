import { Batcher } from "/home/raul/Desktop/stackomate/data-structures/src/batcher";
//import { setMapForUnlocked } from "/home/raul/Desktop/stackomate/data-structures/src/sets/map-for-locked;
import { setFilterForLocked } from './filter-for-locked';
import { setFilterForUnlocked } from './filter-for-unlocked';
import { useSetBatcher } from "../set-batcher";

//TODO: make a size for batchers of sets

//tests ok
export const _setIsEmpty = <T>(set: Set<T>): boolean =>{
    return set.size === 0
};

//tests ok
export const _setHasOld = <T>(set: Set<T>, item: T): boolean =>{
    for (const value of set) {
        if(value === item){
            return true;
        } 
    }
    return false;
}

export const _setHas = <T>(batcher: Batcher<Set<T>>, item: T): boolean =>{
    return batcher.currentValue.has(item);
}

//TODO: see with Rafael if this method needs to be tested
export const _setIterate = <T>(set: Set<T>, item: T) =>{
    set.forEach(value => {
        console.log(value);
    });
}

//TODO: Verify what's the set with less items and choose the best one
export const _setEquals = <T>(set1: Set<T>, set2: Set<T>): boolean =>{
    if(set1.size !== set2.size)
        return false;
    for (const value1 of set1) {
        if(!set2.has(value1))
          return false;
    }
    return true;
}

export const _setAdd = <T>(batcher: Batcher<Set<T>>, item: T): Batcher<Set<T>> =>{
    if (!batcher.currentValue.has(item)) {
        batcher.willChange();
        batcher.currentValue.add(item);
    }
    return batcher;
}

export const _setUnion = <T>(batcher: Batcher<Set<T>>, set1: Set<T>, set2:Set<T>): Batcher<Set<T>> => {
    batcher = useSetBatcher(set1);
    set2.forEach(value => {
        _setAdd(batcher, value);
    });
    return batcher;
}

export const _setRemove = <T>(batcher: Batcher<Set<T>>, item: T): Batcher<Set<T>> => {
    if (batcher.currentValue.has(item)) {
        batcher.willChange();
        batcher.currentValue.delete(item);
    }
    return batcher;
}
//TODO left difference and right difference
export const _setDifference = <T>(batcher: Batcher<Set<T>>, set1: Set<T>, set2: Set<T>): Batcher<Set<T>> => {
    useSetBatcher(set1);
    set1.forEach(value => {
        _setRemove(batcher, value);
    });
    set2.forEach(value => {
        _setRemove(batcher, value);
    });
    return batcher;
}

//TODO: Verify which Set has less values and choose the best way
//TODO: test in set-operations
export const _setIntersection = <T>(batcher: Batcher<Set<T>>, set1: Set<T>, set2: Set<T>): Batcher<Set<T>> => {
    let biggerSet = set1;
    let smallerSet = set2;
    
    //criar função que ordena os sets
    if(biggerSet < smallerSet) {
        let auxSet = smallerSet;
        smallerSet = biggerSet;
        biggerSet = auxSet;
    }
    smallerSet.forEach(value => {
        if(_setHasOld(biggerSet, value)){
            _setAdd(batcher, value);
        }
    });
    return batcher;
}


//TODO: check with Rafael
export const _setOrder = <T>(batcher: Batcher<Set<T>>, ...sets: Set<T>[]): Set<T>[] =>{
    let arr: Set<T>[] = [...sets];
    return arr.sort((a, b) => (a.size > b.size) ? 1 : -1);
}

//TODO: make a stop point after found a false value
export const _setDisjoint = <T>(batcher: Batcher<Set<T>>, set1: Set<T>, set2: Set<T>): boolean => {
    return _setIntersection(batcher, set1, set2).currentValue.size === 0
}

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

export const _setsymetricDifference = <T>(batcher: Batcher<Set<T>>, set1: Set<T>, set2: Set<T>): Batcher<Set<T>> => {
    let biggerSet = set1;
    let smallerSet = set2;
    
    if(biggerSet < smallerSet){
        let auxSet = smallerSet;
        smallerSet = biggerSet;
        biggerSet = auxSet;
    }

    smallerSet.forEach(value => {
        if(!_setHasOld(biggerSet, value)){
            _setAdd(batcher, value);
        }
    });
    return batcher;
}

export const _setEvery = <T>(set: Set<T>, fn: (a: T) => boolean): boolean => {
    for (let value of set) {
        if(!fn(value)){
            return false;
        }
    };
    return true;
}
//

export const _setForEach = <T>(batcher: Batcher<Set<T>>, fn: (value: T, set: Set<T>) => void) : Batcher<Set<T>> => {
    batcher.currentValue.forEach((value, b, set) => fn (value, set));
    return batcher;
}

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
export const _setFind = <T, V>(batcher: Batcher<Set<T>>, fn: (value: T) => boolean): any => {
    for(let item in batcher.currentValue){
        if(fn(item as unknown as T)){
            return item;
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

export type FilterFn<T> = (value: T, map: Set<T>) => boolean

export const _mapFilter = <T>(batcher: Batcher<Set<T>>, fn: FilterFn<T>) : Batcher<Set<T>> => {
    if (batcher.isUnlocked) {
        return setFilterForUnlocked(batcher, fn);
    }
    return setFilterForLocked(batcher, fn);
}
