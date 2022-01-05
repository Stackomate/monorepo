export type MapFilterFn<T, U> = (key: T, value: U, map: Map<T, U>) => boolean;
