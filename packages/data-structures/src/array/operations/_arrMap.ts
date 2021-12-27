import { Batcher } from '../../batcher';
import { _arrForEach } from '../queries/_arrForEach';
import { _arrPush } from './_arrPush';
import { _arrSetIndex } from './_arrSetIndex';

/**
 * Map each item of an array into a resulting item, and return array of resulting items in sequence
 */
export const _arrMap = <T, U>(batcher: Batcher<Array<T>>, fn: (a: T) => U): Batcher<Array<U>> => {
    let hasChanged = false;
    /* Create another variable to change array type
    Note that this still points to the same batcher instance */
    let batcher_ = batcher as unknown as Batcher<U[]>;

    _arrForEach(batcher, (item, index) => {
        const itemOutput = fn(item);
        if ((itemOutput as any) !== (item as any)) {
            /* Clone previous elements in the first change */
            batcher.willChange({to: index - 1})
            _arrSetIndex(batcher_, index, itemOutput);
        }
    });

    return batcher_;
};
