import { Batcher } from '../../precompile-output/batcher';
import { _arrPush } from './_arrPush';
import { _arrForEach } from '../queries/_arrForEach';

/* TODO: Loosen types in copyArrays to return array of joined types */
/** Copy one or more arrays into a target array */
export const _arrSpread = <S>(batcher: Batcher<Array<S>>, copyArrays: Batcher<Array<S>>[]): Batcher<Array<S>> => {
    /* TODO: Behavior may be different than spread because of forEach vs for and empty slots */
    copyArrays.forEach(b => {
        _arrForEach(b, item => {
            _arrPush(batcher, item);
        });
    });
    return batcher;
};
