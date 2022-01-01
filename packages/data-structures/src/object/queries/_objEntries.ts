import { Batcher } from '../../batcher';


export const _objEntries = <T extends Object>(batcher: Batcher<T>): Object[] => {
    return Object.entries(batcher.currentValue);
};
