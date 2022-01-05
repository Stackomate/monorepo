import { Batcher } from '../batcher';
import { _setForEach } from "./_setForEach";
import { SetFilterFn } from "./SetFilterFn";


/* This is a protected function, therefore should not be exposed in the public api */
export const setFilterForUnlocked = <T>(batcher: Batcher<Set<T>>, fn: SetFilterFn<T>): Batcher<Set<T>> => {
    let deleted = false;
    _setForEach(batcher, (value, set) => {    
        if (!fn(value, set)) {
            deleted = true;
            batcher.currentValue.delete(value);
        }
    });
    if (deleted) {
        batcher.willChangeWithoutCloning();
    }
    return batcher;
};
