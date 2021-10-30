import { Batcher } from '../batcher';
import { SetFilterFn, _setForEach } from './set-operations';

export const setFilterForLocked = <T, U>(batcher: Batcher<Set<T>>, fn: SetFilterFn<T>): Batcher<Set<T>> => {
    const result: Set<T> = new Set();
    let hasChanged = false;
    _setForEach(batcher, (value, set) => {
        if (fn(value, set)) {
            result.add(value);
        } else {
            hasChanged = true;
        }
    });
    if (hasChanged) {
        batcher.willChangeWithoutCloning();
        batcher.currentValue = result;
    }
    return batcher;
}