import { Batcher } from '../batcher';
import { MapFilterFn, _mapForEach } from './map-operations';

export const mapFilterForLocked = <T, U>(batcher: Batcher<Map<T, U>>, fn: MapFilterFn<T, U>): Batcher<Map<T, U>> => {
    const result: Map<T, U> = new Map();
    let hasChanged = false;
    _mapForEach(batcher, (key, value, map) => {
        if (fn(key, value, map)) {
            result.set(key, value);
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
