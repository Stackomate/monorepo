import { Batcher } from '../../../batcher';
import { _arrForEach } from "../../queries/_arrForEach";
import { _arrPush } from '../_arrPush';

export function arrFilterForLocked<T>(batcher: Batcher<T[]>, fn: (a: T) => boolean) {
    /* We could have created a new batcher and tracked changes via the .hasChanged property,
    but the overhead is probably not worth it in this case */
    let hasChanged = false;
    _arrForEach(batcher, (item, index) => {
        let isValidItem = fn(item);
        if (!isValidItem && !hasChanged) {
            /* Only clone array until previous item */
            batcher.willChange({to: index - 1});
            hasChanged = true;
        } else if (isValidItem && hasChanged) {
            _arrPush(batcher, item);
        }
    });
    return batcher;
}
