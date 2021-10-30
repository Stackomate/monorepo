import { AddOperation, Operation } from 'fast-json-patch';
import * as jsonpatch from 'fast-json-patch';
import { getOriginalIndex, Ops, SEPARATOR } from './filter';
import { locateAvailablePosition } from './locatePosition';

/* TODO: Improve types */
type OperationWithValue<T> =  Operation & {value: T};

/** Replaces index for an item path, and returns new Path */
export const replaceRootItemPathIndex = (operation: Operation, index: number) => {
  let newPath = operation.path.split(SEPARATOR);
  newPath[1] = `${index}`;
  return newPath.join(SEPARATOR);
}

/** Shortcut to deeply clone an operation */
export const applyOperation: typeof jsonpatch.applyOperation = (target, operation) => jsonpatch.applyOperation(jsonpatch.deepClone(target), jsonpatch.deepClone(operation))

/** Adds item to target and returns relative action */
export const addItem = <T>(
  item: T,
  target: T[],
  originalOperation: OperationWithValue<T>,
  indexes: number[]
): [Operation, T[]] => {
  
  /* Index for fn function should be from origin */
  let originalIndex = getOriginalIndex(originalOperation);

  /* Get mapped index for new item in filtered array */
  let filteredIndex = locateAvailablePosition(originalIndex, indexes);

  /* Adjust path for filtered array */
  let newPath = replaceRootItemPathIndex(originalOperation, filteredIndex)

  let resultingOperation: AddOperation<T> = {
    op: Ops.Add,
    value: originalOperation.value,
    path: newPath
  };

  /* Apply the operation to the filteredArray */
  target = applyOperation(target, resultingOperation).newDocument;
  /* Update the index */
  
  /* Insert index */
  indexes.splice(filteredIndex, 0, originalIndex)

  return [resultingOperation, target];

  /* Need to find proper index in fn */
  /* TODO: Perform binary search to find previous and next items relative in filtered array */
  /* A simple loop will work for demonstration purposes */
};
