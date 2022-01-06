import { Batcher } from '../../../precompile-output/batcher';
import { arrFilterForLocked } from './filter-for-locked';
import { arrFilterForUnlocked } from './filter-for-unlocked';

/**
 * Filter out only the items that satisfy a given function.
 * If batcher is unlocked, will modify existing array and return it;
 * If batcher is locked, will copy filtered results in new array and return it. 
 */
export const _arrFilter = <T>(batcher: Batcher<Array<T>>, fn: (a: T) => boolean): Batcher<Array<T>> => {
    if (batcher.isUnlocked) {
        return arrFilterForUnlocked(batcher, fn);
    }
    return arrFilterForLocked<T>(batcher, fn);
};
