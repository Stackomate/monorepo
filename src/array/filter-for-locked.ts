import { Batcher } from '../batcher';
import { arrForEach } from './array-operations';

export function arrFilterForLocked<T>(batcher: Batcher<T[]>, fn: (a: T) => boolean) {
    const result: Array<T> = [];
    let hasChanged = false;
    arrForEach(batcher, item => {
        if (fn(item)) {
            result.push(item);
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
