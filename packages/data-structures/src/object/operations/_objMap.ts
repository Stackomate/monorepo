import { Batcher } from '../../batcher';
import {_objForEach} from '../queries/_objForEach'

export const _objMap = <T extends Object, U extends Object>(batcher: Batcher<T>, fn: (key: keyof T, value: T[keyof T], obj: T) => [keyof U, U[keyof U]]) : Batcher<U> => {
    /* TODO: Add full [key, value] pair check for rare scenario */
    let result : U = {} as U;
    let hasAdded = false;
    _objForEach(batcher, (key, value, map) => {
        let [newKey, newValue] = fn(key, value, map);
        result[newKey] = newValue;
        // if (!_objHas(batcher, newKey as unknown as keyof T)) {
        //     hasAdded = true;
        // }
    })
    let batcher_ = batcher as unknown as Batcher<U>;    
    // if (hasAdded || Object.keys(result).length !== Object.keys(batcher_.currentValue).length) {
    //     batcher_.willChange();
    //     batcher_.currentValue = result;
    // }
    return batcher_;
}