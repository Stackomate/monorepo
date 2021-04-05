import { Batcher } from "/home/raul/Desktop/stackomate/data-structures/src/batcher";


const isEmpty = <T>(set: Set<T>) =>{
    return set.size === 0
};

const Has = <T>(set: Set<T>, item: T) =>{
    for (const value of set) {
        if(value === item){
            return true;
        } 
    }
    return false;
}

const iterate = <T>(set: Set<T>, item: T) =>{
    set.forEach(value => {
        console.log(value);
    });
}

const equals = <T>(set1: Set<T>, set2: Set<T>) =>{
    for (const value1 of set1) {
        if(!set2.has(value1))
          return false;
    }
    return true;
}

const add = <T>(batcher: Batcher<Set<T>>, item: T) => {
    if (!batcher.currentValue.has(item)) {
        batcher.willChange();
        batcher.currentValue.add(item);
    }
    return batcher;
}



const union = <T>(batcher: Batcher<Set<T>>, set: Set<T>) => {
    set.forEach(value => {
        add(batcher, value);
    });
    return batcher;
}

const remove = <T>(batcher: Batcher<Set<T>>, item: T) => {
    if (batcher.currentValue.has(item)) {
        batcher.willChange();
        batcher.currentValue.delete(item);
    }
    return batcher;
}

const difference = <T>(batcher: Batcher<Set<T>>, set: Set<T>) => {
    set.forEach(value => {
        remove(batcher, value);
    });
    return batcher;
}

const disjunt = <T>(batcher: Batcher<Set<T>>, set1: Set<T>) => {
    set1.forEach(value => {
        add(batcher, value);
    });
    return batcher;
}