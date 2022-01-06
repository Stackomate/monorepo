import { Batcher } from '../../precompile-output/batcher';
import { _objHas } from '../queries/_objHas';


export const _objDelete = <T extends Object, K extends keyof T>(batcher: Batcher<T>, key: K): Batcher<T> => {
    if (_objHas(batcher, key)) {
        batcher.willChange();
        delete batcher.currentValue[key];
    }
    return batcher;
};
