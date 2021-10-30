import { FilterFn, IndexMapping } from './filter';

export const bootstrapFilterFor = <T>(obj: T[], fn: FilterFn<T>): [IndexMapping, T[]] => {
  let indexes: IndexMapping = [];
  let current = obj.filter((item, i) => {
    let z = fn(item, i);
    if (z) {
      indexes.push(i);
    }
    return z;
  });
  return [indexes, current];
};
