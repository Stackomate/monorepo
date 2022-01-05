import { Batcher } from '../batcher';
import { _mapForEach } from "./_mapForEach";
import { MapFilterFn } from "./MapFilterFn";


/* This is a protected function, therefore should not be exposed in the public api */
export const mapFilterForUnlocked = <T, U>(batcher: Batcher<Map<T, U>>, fn: MapFilterFn<T, U>): Batcher<Map<T, U>> => {
    let deleted = false;
    _mapForEach(batcher, (key, value, map) => {    
        if (!fn(key, value, map)) {
            deleted = true;
            batcher.currentValue.delete(key);
        }
    });
    if (deleted) {
        batcher.willChangeWithoutCloning();
    }
    return batcher;
};
