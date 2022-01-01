import { Batcher } from "../../batcher";

/* 
    Clone array should take into account void spaces in the arrays
    Spread syntax does not distinguish between empty and undefined
*/
export const cloneArray = <T>(initial: Array<T>, batcher: Batcher<Array<T>>, options?: {to: number}) => {
    let result = [];
    let len = options ? options.to + 1 : initial.length;
    for (let i = 0; i < len; i++) {
        if (i in initial) {
            result[i] = initial[i]
        }
    }
    result.length = len;
    return result;
};
interface CreateArrayBatcherFunction {
    <T>(target: Array<T>, mutate?: boolean): Batcher<Array<T>>;
}

export const createArrayBatcher: CreateArrayBatcherFunction = <T>(
    target: Array<T>,
    mutate: boolean = false
): Batcher<Array<T>> => {
    return new Batcher(target, mutate, cloneArray);
};