import { Batcher } from '../../batcher';
import { arrFilterForLocked } from './filter-for-locked';
import { arrFilterForUnlocked } from './filter-for-unlocked';

/* Note: Filter will use a new array for the batcher's currentValue */


export const _arrFilter = <T>(batcher: Batcher<Array<T>>, fn: (a: T) => boolean): Batcher<Array<T>> => {
    if (batcher.isUnlocked) {
        return arrFilterForUnlocked(batcher, fn);
    }
    return arrFilterForLocked<T>(batcher, fn);
};
