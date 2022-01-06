import { Batcher } from './precompile-output/batcher';
import { add as setAdd, filter as setFilter, remove as setRemove } from './set-operations';

export const add = <T>(batcher: Batcher<Set<T>>, item: T) => setAdd({batcher, item});
export const remove = <T>(batcher: Batcher<Set<T>>, item: T) => setRemove({batcher, item});
export const filter = <T>(batcher: Batcher<Set<T>>, fn: (item: T) => boolean) => setFilter({batcher, fn});