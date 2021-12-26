import { Batcher } from "../batcher";

export const cloneArray = <T>(initial: Array<T>) => [...initial];
interface CreateArrayBatcherFunction {
    <T>(target: Array<T>, mutate?: boolean): Batcher<Array<T>>;
}

export const createArrayBatcher: CreateArrayBatcherFunction = <T>(
    target: Array<T>,
    mutate: boolean = false
): Batcher<Array<T>> => {
    /* TODO: Remove as Array<T> */
    return new Batcher(target, mutate, cloneArray);
};