import { Batcher } from '../batcher';
import { setFilterForLocked } from './filter-for-locked';
import { setFilterForUnlocked } from './filter-for-unlocked';


export type SetFilterFn<T> = (value: T, set: Set<T>) => boolean;

export const _setFilter = <T>(batcher: Batcher<Set<T>>, fn: SetFilterFn<T>): Batcher<Set<T>> => {
    if (batcher.isUnlocked) {
        return setFilterForUnlocked(batcher, fn);
    }
    return setFilterForLocked(batcher, fn);
};
