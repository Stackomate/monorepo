import {Batcher} from '../../precompile-output/batcher';
import { _arrLength } from '../queries/_arrLength';
import { _arrSetIndex } from './_arrSetIndex';
import { _arrPush } from './_arrPush';
import { _arrEntries } from '../queries/_arrEntries';
import { _arrIteratorForEach } from '../queries/_arrIteratorForEach';

export const _arrUpsertWithFind = <T>(
    batcher: Batcher<Array<T>>, 
    findOne: (item: T, index: number, array: Array<T>) => boolean,
    fn: (item: T, index: number, array: Array<T>) => T, 
    fallback: (index: number, array: Array<T>) => T
) => {
    let arr = batcher.currentValue;
    for (let [index, item] of _arrEntries(batcher)) {
        if (findOne(item, index, arr)) {
            _arrSetIndex(batcher, index, fn(item, index, arr))
            return batcher;
        }
    };

    _arrPush(batcher, fallback(_arrLength(batcher), batcher.currentValue));
    return batcher;
}

