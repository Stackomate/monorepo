/* TODO: Types below are slow and do not work for recursive structures
Instead, precompile types to make them faster */
// type ObjectPaths<O extends object> = {
//     [Property in keyof O]-?: [Property] | [Property, ...KeysFor<O[Property]>]
// }

// type Primitives = boolean | number | string | null | undefined
// type KeysFor<T> = T extends Primitives ? [] : 
//                 ( T extends Array<infer O> ? [number] | [number, ...KeysFor<O>] : 
//                     ( T extends object ? ObjectPaths<T>[keyof T] : [] )
//                 )

// /* Used to "remove" last tuple element from type:
// Source: https://stackoverflow.com/questions/63789897/typescript-remove-last-element-from-parameters-tuple-currying-away-last-argum */
// type Head<T> = T extends [ any, ...infer Head] ? Head : any[];

// type Path<T> = KeysFor<T>;
// type ValueFor<T extends object, P extends Path<T>> = P extends [any] ? T[P[0]] : ValueFor<T[P[0]], Head<P>>;