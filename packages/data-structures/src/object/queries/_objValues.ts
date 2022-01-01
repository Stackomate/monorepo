import { Batcher } from '../../batcher';


export const _objValues = <T extends Object>(batcher: Batcher<T>): T[] => {
    return Object.values(batcher.currentValue);
};
