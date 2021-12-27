import { Batcher } from '../../batcher';
import { _arrLength } from '../queries/_arrLength';

/**
 * Add an item to the end of the array.
 */
export const _arrPush = <T>(batcher: Batcher<Array<T>>, item: T): Batcher<Array<T>> => {
    batcher.willChange();
    batcher.currentValue[_arrLength(batcher)] = item;
    return batcher;
};
