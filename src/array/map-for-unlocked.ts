import { Batcher } from '../batcher';
import { arrForEach } from './array-operations';


export const arrMapForUnlocked = <T, U>(batcher: Batcher<Array<T>>, fn: (a: T) => U): Batcher<Array<U>> => {
    let changed = false;

    let arrResult = batcher.currentValue as Array<T | U>;
    arrForEach(batcher, (item, index) => {
        let itemResult = fn(item);
        if ((item as any) !== (itemResult as any)) {
            changed = true;
        }
        arrResult[index] = itemResult;
    });

    if (!changed) {
        batcher.willChangeWithoutCloning();
    }
    let batcher_ = batcher as unknown as Batcher<U[]>;
    return batcher_;
};
