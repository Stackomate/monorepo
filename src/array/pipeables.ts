import { Batcher } from "../batcher";
import { arrFilter, arrMap, arrPush, arrSetIndex, arrSetLength, arrSpread } from "./array-operations";

export const arr_filter = <T> (batcher: Batcher<Array<T>>) => (fn: (a: T) => boolean) : Batcher<Array<T>> => arrFilter(batcher, fn);
export const arr_map =  <T, U> (batcher: Batcher<Array<T>>) => (fn: (a: T) => U) : Batcher<Array<U>> => arrMap(batcher, fn);
export const arr_push = <T> (batcher: Batcher<Array<T>>) => (item: T) : Batcher<Array<T>> => arrPush(batcher, item);
export const arr_set = <T> (batcher: Batcher<Array<T>>) => (index: number, item: T) : Batcher<Array<T>> => arrSetIndex(batcher, index, item);
export const arr_setLength = <T> (batcher: Batcher<Array<T>>) => (length: number) : Batcher<Array<T>> => arrSetLength(batcher, length);
export const arr_spread = <S> (batcher: Batcher<Array<S>>) => (...copyArrays: Batcher<Array<S>>[]) : Batcher<Array<S>> => arrSpread(batcher, copyArrays);
