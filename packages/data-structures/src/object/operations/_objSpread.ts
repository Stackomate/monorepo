import { Batcher } from '../../batcher';
import { _objForEach } from '../queries/_objForEach';
import { _objSet } from './_objSet';


export const _objSpread = <T extends Object>(batcher: Batcher<T>, copyObj: Batcher<T>[]): Batcher<T> => {
    copyObj.forEach(b => {
        _objForEach(b, (key, value) => {
            _objSet(batcher, key, value);
        });
    });
    return batcher;
};
