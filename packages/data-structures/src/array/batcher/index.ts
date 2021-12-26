import { Batcher } from "../../batcher";
import { _arrValuesUntil } from "../queries/_arrValuesUntil";


export const cloneArray = <T>(initial: Array<T>, batcher: Batcher<Array<T>>, options?: {to: number}) => {
    return [...(options ? _arrValuesUntil(initial, options.to) : initial)]
};
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