import { Batcher } from '../../batcher';
import { _arrForEach } from "../queries/_arrForEach";
import { _arrSetLength } from "./_arrSetLength";

/* This is a protected function, therefore should not be exposed in the public api */
export const arrFilterForUnlocked = <T>(batcher: Batcher<Array<T>>, fn: (a: T) => boolean): Batcher<Array<T>> => {
    let deletions = 0;
    _arrForEach(batcher, (item, index, arr) => {
        arr[index - deletions] = item;        
        if (!fn(item)) {
            deletions++;
        }
    });
    if (deletions > 0) {
        batcher.willChangeWithoutCloning();
    }
    _arrSetLength(batcher, -deletions);
    return batcher;
};
