import { Batcher } from "../batcher";
import { arrFilter, arrMap, arrPush, arrSetIndex, arrSetLength, arrSpread } from "./array-operations";

export const arr_filter = <T>(fn: (a: T) => boolean) => (batcher: Batcher<Array<T>>) : Batcher<Array<T>> => arrFilter(batcher, fn);
export const arr_map =  <T, U>(fn: (a: T) => U) => (batcher: Batcher<Array<T>>) : Batcher<Array<U>> => arrMap(batcher, fn);
export const arr_push = <T>(item: T) => (batcher: Batcher<Array<T>>) : Batcher<Array<T>> => arrPush(batcher, item);
export const arr_set = <T>(index: number, item: T) => (batcher: Batcher<Array<T>>): Batcher<Array<T>> => arrSetIndex(batcher, index, item);
export const arr_setLength = <T>(length: number) => (batcher: Batcher<Array<T>>) : Batcher<Array<T>> => arrSetLength(batcher, length);
export const arr_spread = <S>(...copyArrays: Batcher<Array<S>>[]) => (batcher: Batcher<Array<S>>) : Batcher<Array<S>> => arrSpread(batcher, copyArrays);
