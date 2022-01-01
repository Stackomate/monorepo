import { Batcher } from "../batcher";
import { _objMap } from "./operations/_objMap";
import { _objSpread } from "./operations/_objSpread";
import { ObjForEachFn, _objForEach } from "./queries/_objForEach";
import { _objDelete } from "./operations/_objDelete";
import { _objClear } from "./operations/_objClear";
import { _objEntries } from "./queries/_objEntries";
import { _objValues } from "./queries/_objValues";
import { _objKeys } from "./queries/_objKeys";
import { _objSet } from "./operations/_objSet";
import { _objGet } from "./queries/_objGet";
import { _objHas } from "./queries/_objHas";

export const objHas = <T extends Object>(key: keyof T ) => (batcher: Batcher<T>) : boolean => _objHas(batcher, key);
export const $objHas = <T extends Object>(batcher: Batcher<T>) => (key: keyof T ) : boolean => _objHas(batcher, key);

export const objGet = <T extends Object, K extends keyof T>(batcher: Batcher<T>) => (key: K) : T[K] => _objGet(batcher, key);
export const $objGet = <T extends Object, K extends keyof T>(key: K) => (batcher: Batcher<T>) : T[K] => _objGet(batcher, key);

export const objSet = <T extends Object>(key: keyof T, value: T[ keyof T]) => (batcher: Batcher<T>) : T => _objSet(batcher, key, value);
export const $objSet = <T extends Object> (batcher: Batcher<T>) => (key: keyof T, value: T[ keyof T]) : T => _objSet(batcher, key, value);

export const objKeys = <T extends Object>() => (batcher: Batcher<T>): string[] => _objKeys(batcher);
export const $objKeys = <T extends Object> (batcher: Batcher<T>) => () : string[] => _objKeys(batcher);

export const objValues = <T extends Object> () => (batcher: Batcher<T>): T[] => _objValues(batcher);
export const $objValues = <T extends Object> () => (batcher: Batcher<T>): T[] => _objValues(batcher);

export const objEntries = <T extends Object>() => (batcher: Batcher<T>): Object[] => _objEntries(batcher);
export const $objEntries = <T extends Object>(batcher: Batcher<T>) => () : Object[] => _objEntries(batcher);

export const objClear = <T extends Object>() => (batcher: Batcher<T>): Batcher<T> => _objClear(batcher);
export const $objClear = <T extends Object> (batcher: Batcher<T>) => (): Batcher<T> => _objClear(batcher);

export const objDelete = <T extends Object, K extends keyof T> (key: K) => (batcher: Batcher<T>): Batcher<T> => _objDelete(batcher, key);
export const $objDelete = <T extends Object, K extends keyof T> (batcher: Batcher<T>) => (key: K) : Batcher<T> => _objDelete(batcher, key);

export const objForEach = <T extends Object>(fn: ObjForEachFn<T>) => (batcher: Batcher<T>) : Batcher<T> => _objForEach(batcher, fn);
export const $objForEach = <T extends Object>(batcher: Batcher<T>) => (fn: ObjForEachFn<T>) : Batcher<T> => _objForEach(batcher, fn);

export const objSpread = <T extends Object>(...copyObj: Batcher<T>[]) => (batcher: Batcher<T>) : Batcher<T> => _objSpread(batcher, copyObj);
export const $objSpread = <T extends Object>(batcher: Batcher<T>) => (...copyObj: Batcher<T>[]) : Batcher<T> => _objSpread(batcher, copyObj);

export const objMap = <T extends Object, U extends Object>(fn: (key: keyof T, value: T[keyof T], obj: T) => [keyof U, U[keyof U]]) => (batcher: Batcher<T>) : Batcher<U> => _objMap(batcher, fn);
export const $objMap = <T extends Object, U extends Object> (batcher: Batcher<T>) => (fn: (key: keyof T, value: T[keyof T], obj: T) => [keyof U, U[keyof U]]) : Batcher<U> => _objMap(batcher, fn);






