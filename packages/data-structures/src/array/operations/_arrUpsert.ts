import { Batcher } from '../../batcher';
import { _arrUpsertWithFind, _arrUpsertWithFindWithForEach } from './array-operations';


export const _arrUpsert = <T>(
    batcher: Batcher<Array<T>>,
    item: T,
    fn: (item: T, index: number, array: Array<T>) => T,
    fallback: (index: number, array: Array<T>) => T,
    useDefaultIterator: boolean = true
) => {
    return (useDefaultIterator ? _arrUpsertWithFind : _arrUpsertWithFindWithForEach)(batcher, (i) => i === item, fn, fallback);
};
