import { Batcher } from "../batcher";
import { _isSubSet, _isSuperSet, _setAdd, _setCartesianProduct, _setDifference, _setDisjoint, _setEquals, _setEvery, _setFind, _setHas, _setIntersection, _setIsEmpty, _setMap, _setRemove, _setSymmetricDifference, _setUnion,  } from "./set-operations";
import { _setForEach } from "./_setForEach";
import { SetFilterFn, _setFilter } from "./SetFilterFn";

export const setIsEmpty = <T> () => (batcher: Batcher<Set<T>>): boolean => _setIsEmpty(batcher);
export const $setIsEmpty = <T> (batcher: Batcher<Set<T>>) => () : boolean => _setIsEmpty(batcher);

export const setHas = <T> (item: T) => (batcher: Batcher<Set<T>>): boolean => _setHas(batcher, item);
export const $setHas = <T> (batcher: Batcher<Set<T>>) => (item: T) : boolean => _setHas(batcher, item);

export const setEquals = <T> (set2: Set<T>) => (set1: Batcher<Set<T>>) : boolean => _setEquals(set1, set2);
export const $setEquals = <T> (set1: Batcher<Set<T>>) => (set2: Set<T>): boolean => _setEquals(set1, set2);

export const setAdd = <T> (item: T) => (set: Batcher<Set<T>>) : Batcher<Set<T>> => _setAdd(set, item);
export const $setAdd = <T> (set: Batcher<Set<T>>) => (item: T) : Batcher<Set<T>> => _setAdd(set, item);

export const setUnion = <T>(set2: Set<T>) => (set: Batcher<Set<T>>): Batcher<Set<T>> => _setUnion(set, set2);
export const $setUnion = <T>(set: Batcher<Set<T>>) => (set2: Set<T>) : Batcher<Set<T>> => _setUnion(set, set2);

export const setRemove = <T> (item: T) => (set: Batcher<Set<T>>) : Batcher<Set<T>> =>  _setRemove(set, item);
export const $setRemove = <T> (set: Batcher<Set<T>>) => (item: T) : Batcher<Set<T>> =>  _setRemove(set, item);

export const setDifference = <T>(set2: Set<T>) => (set1: Batcher<Set<T>>) : Batcher<Set<T>> => _setDifference(set1, set2);
export const $setDifference = <T> (set1: Batcher<Set<T>>) => (set2: Set<T>) : Batcher<Set<T>> => _setDifference(set1, set2);

export const setIntersection = <T> (set2: Set<T>) => (set1: Batcher<Set<T>>) : Batcher<Set<T>> => _setIntersection(set1, set2);
export const $setIntersection = <T> (set1: Batcher<Set<T>>) => (set2: Set<T>) : Batcher<Set<T>> => _setIntersection(set1, set2);

export const setDisjoint = <T>(set2: Set<T>) => (set1: Batcher<Set<T>>) : boolean => _setDisjoint(set1, set2);
export const $setDisjoint = <T> (set1: Batcher<Set<T>>) => (set2: Set<T>) : boolean => _setDisjoint(set1, set2);

export const isSubSet = <T>(set2: Set<T>) => (set1: Batcher<Set<T>>) : boolean => _isSubSet(set1, set2);
export const $isSubSet = <T> (set1: Batcher<Set<T>>) => (set2: Set<T>) : boolean => _isSubSet(set1, set2);

export const isSuperSet = <T>(set2: Set<T>) => (set1: Batcher<Set<T>>) : boolean => _isSuperSet(set1, set2);
export const $isSuperSet = <T> (set1: Batcher<Set<T>>) => (set2: Set<T>) : boolean => _isSuperSet(set1, set2);

export const setSymmetricDifference = <T>(set2: Set<T>) => (set1: Batcher<Set<T>>) : Batcher<Set<T>> => _setSymmetricDifference(set1, set2);
export const $setSymmetricDifference = <T>(set1: Batcher<Set<T>>) => (set2: Set<T>): Batcher<Set<T>> => _setSymmetricDifference(set1, set2);

export const setEvery = <T>(fn: (a: T) => boolean) => (set: Batcher<Set<T>>) : boolean => _setEvery(set, fn);
export const $setEvery = <T>(set: Batcher<Set<T>>) => (fn: (a: T) => boolean) : boolean => _setEvery(set, fn);

export const setForEach = <T>(fn: (value: T, set: Set<T>) => void) => (batcher: Batcher<Set<T>>) : Batcher<Set<T>> => _setForEach(batcher, fn);
export const $setForEach = <T>(batcher: Batcher<Set<T>>) => (fn: (value: T, set: Set<T>) => void): Batcher<Set<T>> => _setForEach(batcher, fn);

export const setMap = <T, V>(fn: (value: T, set: Set<T>) => V) => (batcher: Batcher<Set<T>>) : Batcher<Set<V>> => _setMap(batcher, fn);
export const $setMap = <T, V>(batcher: Batcher<Set<T>>) => (fn: (value: T, set: Set<T>) => V) : Batcher<Set<V>> => _setMap(batcher, fn);

export const setFind = <T>(fn: (value: T) => boolean) => (batcher: Batcher<Set<T>>) : any => _setFind(batcher, fn);
export const $setFind = <T>(batcher: Batcher<Set<T>>) => (fn: (value: T) => boolean) : any => _setFind(batcher, fn);

export const setCartesianProduct = <T, U>(set: Set<U>) => (batcher: Batcher<Set<T>>) : Batcher<Set<[T, U]>> => _setCartesianProduct(batcher, set);
export const $setCartesianProduct = <T, U> (batcher: Batcher<Set<T>>) => (set: Set<U>) : Batcher<Set<[T, U]>> => _setCartesianProduct(batcher, set);

export const setFilter = <T>(fn: SetFilterFn<T>) => (batcher: Batcher<Set<T>>) : Batcher<Set<T>> => _setFilter(batcher, fn);
export const $setFilter = <T>(batcher: Batcher<Set<T>>) => (fn: SetFilterFn<T>) : Batcher<Set<T>> => _setFilter(batcher, fn);