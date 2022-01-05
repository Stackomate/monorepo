import { Operation } from 'fast-json-patch';
import { applyOperation, replaceRootItemPathIndex } from './addItem';
import { getOriginalIndex, IndexMapping, Ops } from './filter';
import { getIndexInFilteredArray } from './getIndexInFilteredArray';
import { locateAvailablePosition } from './locatePosition';

export const removeItemIfPresent = <T>(target: T[], originalEvent: Operation, indexes: IndexMapping, removeIndexes = false): [Operation | null, T[]] => {
    /* If was previously in filtered array, remove it */
    let originIndex = getOriginalIndex(originalEvent);
    let resolvedIndex = getIndexInFilteredArray(originIndex, indexes);

    let foundItem = resolvedIndex !== -1;

    if (foundItem) {
        let newPath = replaceRootItemPathIndex(originalEvent, resolvedIndex);
        let filteredOperation: Operation = { op: Ops.Remove, path: newPath };
        target = applyOperation(target, filteredOperation).newDocument;

        /* Remove index */
        indexes.splice(resolvedIndex, 1)
        /* Update subsequent indexes */
        if (removeIndexes) {
            for (let i = resolvedIndex, j = indexes.length; i < j; i++) {
                indexes[i] = indexes[i] - 1;
            }
        }


        return [filteredOperation, target];
    }

    /* Update subsequent indexes */
    if (removeIndexes) {
        for (let i = locateAvailablePosition(originIndex, indexes), j = indexes.length; i < j; i++) {
            indexes[i] = indexes[i] - 1;
        }
    }

    return [null, target];
};
