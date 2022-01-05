import { Operation } from 'fast-json-patch';
import { addItem, applyOperation, replaceRootItemPathIndex } from './addItem';
import { bootstrapFilterFor } from './bootstrapFilterFor';
import { getIndexInFilteredArray } from './getIndexInFilteredArray';
import { locateAvailablePosition } from './locatePosition';
import { removeItemIfPresent } from './removeItemIfPresent';

/** Maps origin array indexes into filtered array indexes 
 * 
 * origin => filtered
 * 
 * Example:
 * 
 * 4 => 0
 * 
 * 5 => 1
 * 
 * will be represented as
 * [4, 5]
 */
export type IndexMapping = number[];
export type FilterFn<T> = (a: T, b: number) => boolean;

export enum Ops {
  Add = 'add',
  Remove = 'remove'
};
export const SEPARATOR = '/'

/** Decides if the operation changes the root array by adding or removing items to it */
const isRootArrayChange = (op: Operation) => op.path.split(SEPARATOR).length === 2;
export const getOriginalIndex = (op: Operation) => Number(op.path.split(SEPARATOR)[1]);

export const pushIfTruthy = <T>(target: T[]) => (...items: (T | null)[]) => {
  for (let item of items) {
    if (item) {
      return target.push(item);
    }
  }
  return target.length;
}

/* TODO: Code may be improved if we check for new validations or invalidations first;
If no changes, map action into relative action for filtered array */

export const JSONFilter = <T>(objFn: () => T[], fn: FilterFn<T>) => {

  let [
    /** Maps indexes to keep track of changes */
    indexMapping,
    /** Holds current value of filtered array */
    filteredResult
  ] = bootstrapFilterFor(objFn(), fn);

  return (inputOps: Operation[]): [Operation[], T[], IndexMapping] => {

    /** Resulting operations for filtered array */
    let outputOps: Operation[] = [];

    /* TODO: Write path parser */
    /* TODO: Add support for all actions (move, copy, test, replace) */

    for (let operation of inputOps) {

      /* This may not work for move action */

      /* If op is add or remove for an array index (root),
      update index mapping and map the action into the possible new item in filtered array */
      if (isRootArrayChange(operation)) {
        // console.log('IS ROOT')
        if (operation.op === Ops.Add) {
          // console.log('IS ADD')
          let originalIndex = getOriginalIndex(operation);
          let originalItem = objFn()[originalIndex];

          /* If item added to original array passes the filter test, 
            update indexMapping, filteredResult and output operations */
          if (fn(originalItem, originalIndex)) {
            // console.log('adding', operation.value)
            let [op, newTarget] = addItem(originalItem, filteredResult, operation, indexMapping);
            filteredResult = newTarget;
            outputOps.push(
              op
            )

            /* Index mapping always needs to be updated */
            /* Update subsequent indexes */
            /* Get mapped index for new item in filtered array */
            let filteredIndex = getIndexInFilteredArray(originalIndex, indexMapping);
            for (let i = filteredIndex + 1, j = indexMapping.length; i < j; i++) {
              indexMapping[i] = indexMapping[i] + 1;
            }
          } else {
            let filteredIndex = locateAvailablePosition(originalIndex, indexMapping);
            for (let i = filteredIndex, j = indexMapping.length; i < j; i++) {
              indexMapping[i] = indexMapping[i] + 1;
            }
          }



        } else if (operation.op === Ops.Remove) {
          let [op, target] = removeItemIfPresent(filteredResult, operation, indexMapping, true)
          /* Remove item if it was in filtered array */
          pushIfTruthy(outputOps)(op);
          filteredResult = target;

        }
      } else {
        /* Has to be a nested change */

        /* Otherwise, the operation could validate or invalidate an existing item
        Code below will probably work for replace too... */

        /* Index in the origin */
        let originalIndex = getOriginalIndex(operation);
        let originalItem = objFn()[originalIndex];

        /* Map index relative to the filtered array */
        let resolvedIndex = getIndexInFilteredArray(originalIndex, indexMapping);

        /* If resolvedIndex is negative,
        it means that original item is not in the filtered array */
        let notFound = resolvedIndex === -1;

        if (notFound) {

          /* Item could become accepted due to nested operation, 
          check filter function again */
          if (fn(originalItem, originalIndex)) {
            /* If validating a previously invalid item, 
      then item needs to be inserted into filtered array */
            /* new validation */
            let pseudoAction = {
              op: Ops.Add,
              value: originalItem,
              path: `/${originalIndex}`
            };
            addItem(originalItem, filteredResult, pseudoAction, indexMapping);
          } else {
            /* Skip if relative item is not in filtered array, no changes */
            continue;
          }
        } else if (!fn(originalItem, originalIndex)) {
          /* If invalidating a previously valid item,
      then item needs to be removed from filtered array */
          /* new invalidation */

          let [op, target] = removeItemIfPresent(filteredResult, { ...operation, path: operation.path.split(SEPARATOR).slice(0, 2).join(SEPARATOR) }, indexMapping);
          pushIfTruthy(outputOps)(op);
          filteredResult = target;

        } else {

          /* Adjust path for filtered array */
          let newPath = replaceRootItemPathIndex(operation, resolvedIndex);
          let filteredOperation = { ...operation, path: newPath };

          filteredResult = applyOperation(filteredResult, filteredOperation).newDocument;
          outputOps.push(
            filteredOperation
          )

        }
      }
    }

    return [
      outputOps, filteredResult, indexMapping
    ]
  };
};