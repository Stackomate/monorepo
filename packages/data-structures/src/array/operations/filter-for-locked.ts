import { Batcher } from '../../batcher';
import { _arrForEach } from "../queries/_arrForEach";

export function arrFilterForLocked<T>(batcher: Batcher<T[]>, fn: (a: T) => boolean) {
    let hasChanged = false;
    _arrForEach(batcher, (item, index) => {
        let isValidItem = fn(item);
        if (!isValidItem && !hasChanged) {
            /* Only clone array until previous item */
            batcher.willChange({to: index - 1});
            hasChanged = true;
        } else if (isValidItem && hasChanged) {
            batcher.currentValue.push(item);
        }
    });
    return batcher;
}
