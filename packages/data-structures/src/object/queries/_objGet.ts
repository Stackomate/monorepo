import { Batcher } from '../../batcher';


export const _objGet = <T extends Object, K extends keyof T>(batcher: Batcher<T>, key: K): T[K] => {
    /* TODO: Return empty symbol option */
    return batcher.currentValue[key];
};
