import { Batcher } from "../../precompile-output/batcher";

export const cloneObject = <T extends Object>(initial: T): T => ({...initial});

interface CreateObjectBatcherFunction {
    <T extends Object>(target: T, mutate?: boolean): Batcher<T>;
}

export const createObjectBatcher: CreateObjectBatcherFunction = <T extends Object>(
    target: T,
    mutate: boolean = false,
): Batcher<T> => {
    /* TODO: Remove as Array<T> */
    return new Batcher(target, mutate, cloneObject);
};
