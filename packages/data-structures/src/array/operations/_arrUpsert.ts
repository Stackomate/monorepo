import { Batcher } from '../../precompile-output/batcher';
import { _arrUpsertWithFind } from './_arrUpsertWithFind';
import { _arrUpsertWithFindWithForEach } from './_arrUpsertWithFindForEach';


export const _arrUpsert = <T>(
    batcher: Batcher<Array<T>>,
    item: T,
    fn: (item: T, index: number, array: Array<T>) => T,
    fallback: (index: number, array: Array<T>) => T,
    useDefaultIterator: boolean = true
) => {
    return (useDefaultIterator ? _arrUpsertWithFind : _arrUpsertWithFindWithForEach)(batcher, (i) => i === item, fn, fallback);
};
