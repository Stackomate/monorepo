import { Batcher } from "../batcher";
import { _arrFilter, _arrLength, _arrMap, _arrPush, _arrSetIndex, _arrSetLength, _arrSpread } from "./array-operations";

export const arrFilter = <T>(fn: (a: T) => boolean) => (batcher: Batcher<Array<T>>) : Batcher<Array<T>> => _arrFilter(batcher, fn);
export const arrMap =  <T, U>(fn: (a: T) => U) => (batcher: Batcher<Array<T>>) : Batcher<Array<U>> => _arrMap(batcher, fn);
export const arrPush = <T>(item: T) => (batcher: Batcher<Array<T>>) : Batcher<Array<T>> => _arrPush(batcher, item);
export const arrSet = <T>(index: number, item: T) => (batcher: Batcher<Array<T>>): Batcher<Array<T>> => _arrSetIndex(batcher, index, item);
export const arrSetLength = <T>(length: number) => (batcher: Batcher<Array<T>>) : Batcher<Array<T>> => _arrSetLength(batcher, length);
export const arrSpread = <S>(...copyArrays: Batcher<Array<S>>[]) => (batcher: Batcher<Array<S>>) : Batcher<Array<S>> => _arrSpread(batcher, copyArrays);
export const arrLength = <T>() => (batcher: Batcher<Array<T>>) : number => _arrLength(batcher);

export const $arrFilter = <T> (batcher: Batcher<Array<T>>) => (fn: (a: T) => boolean): Batcher<Array<T>> => _arrFilter(batcher, fn);
export const $arrMap =  <T, U> (batcher: Batcher<Array<T>>) => (fn: (a: T) => U) : Batcher<Array<U>> => _arrMap(batcher, fn);
export const $arrPush = <T> (batcher: Batcher<Array<T>>) => (item: T) : Batcher<Array<T>> => _arrPush(batcher, item);
export const $arrSet = <T> (batcher: Batcher<Array<T>>) => (index: number, item: T) : Batcher<Array<T>> => _arrSetIndex(batcher, index, item);
export const $arrSetLength = <T>(batcher: Batcher<Array<T>>) => (length: number) : Batcher<Array<T>> => _arrSetLength(batcher, length);
export const $arrSpread = <S>(batcher: Batcher<Array<S>>) => (...copyArrays: Batcher<Array<S>>[]) : Batcher<Array<S>> => _arrSpread(batcher, copyArrays);
