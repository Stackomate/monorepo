import { Batcher } from '../../batcher';
import { _objHas } from '../queries/_objHas';
import { _objGet } from '../queries/_objGet';


export const _objSet = <T extends Object>(batcher: Batcher<T>, key: keyof T, value: T[keyof T]): T => {
    if (!_objHas(batcher, key) || _objGet(batcher, key) !== value) {
        batcher.willChange();
        batcher.currentValue[key] = value;
    }
    return batcher.currentValue;
};
