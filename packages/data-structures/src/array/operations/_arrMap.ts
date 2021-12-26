import { Batcher } from '../../batcher';
import { arrMapForLocked } from './map-for-locked';
import { arrMapForUnlocked } from './map-for-unlocked';



export const _arrMap = <T, U>(batcher: Batcher<Array<T>>, fn: (a: T) => U): Batcher<Array<U>> => {
    if (batcher.isUnlocked) {
        return arrMapForUnlocked(batcher, fn);
    }
    return arrMapForLocked(batcher, fn);
};
