import { Batcher } from '../../precompile-output/batcher';
import { _arrValues } from './_arrValues';


/* TODO: Export to public api; Create version for batcher */
export function* _arrValuesUntil <T>(array: Array<T>, to: number) {
    let count = 0;
    for (let item of array) {
        if (count > to) {
            break;
        }
        count++;
        yield item;
    }
};
