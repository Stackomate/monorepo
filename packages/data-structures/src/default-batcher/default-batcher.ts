import { ckmGet, CompositeKeyNode, _ckmFromArray } from "../composite-key-map";
import { Batcher, Fn, _getValue, log, tap, getValue } from "../data-structures";
import { createObjectBatcher } from "../object";


export type FnDefaultBatcherArg<T, A> = (a: DefaultBatcher<T>) => A;
export class DefaultBatcher<T> extends Batcher<T> {
    /* TODO: Improve typing */
    public nestedBatchers: CompositeKeyNode<string, Batcher<any>> = _ckmFromArray([]);

    /* Only required to change the types from Batcher to DefaultBatcher */
    public apply <A>(f1: FnDefaultBatcherArg<T, A>): A;
    public apply <A, B>(f1: FnDefaultBatcherArg<T, A>, f2: Fn<A, B>): B;    
    public apply <A, B, C>(f1: FnDefaultBatcherArg<T, A>, f2: Fn<A, B>, f3: Fn<B, C>): C;
    public apply <A, B, C, D>(f1: FnDefaultBatcherArg<T, A>, f2: Fn<A, B>, f3: Fn<B, C>, f4: Fn<C, D>): D;
    public apply <A, B, C, D, E>(f1: FnDefaultBatcherArg<T, A>, f2: Fn<A, B>, f3: Fn<B, C>, f4: Fn<C, D>, f5: Fn<D, E>): E;
    public apply <A, B, C, D, E, F>(f1: FnDefaultBatcherArg<T, A>, f2: Fn<A, B>, f3: Fn<B, C>, f4: Fn<C, D>, f5: Fn<D, E>, f6: Fn<E, F>): F;    
    public apply(...args: any []) {
        /* TODO: Remove as any when possible */
        return (super.apply as any)(...args)
    }

}


interface _Touch {
    <T, K extends keyof T>(batcher: DefaultBatcher<T>, Path: [K]) : DefaultBatcher<T[K]>;
}

const _touch: _Touch = (batcher: any, path: any) => {
    /* TODO: Fix logic */
    let subBatcher = batcher.nestedBatchers.apply(
        ckmGet(path)
    );

    /* If there was no batcher, create one and leave it in the memory */

    return subBatcher;
}

interface Touch {
    <T, K extends keyof T>(Path: [K]) : (batcher: DefaultBatcher<T>) => DefaultBatcher<T[K]>;
}

const touch: Touch = (path: any) => (batcher: any) => _touch(batcher, path);

const createBatcher = <A extends object>(a: A) => {
    /* TODO: Add cloning function */
    return new DefaultBatcher(a, false, (a, batcher, params) => {return a});
}

/* TODO: Create select which only reads nested batcher values without need for creating batchers */

let ex = createBatcher({
    a: [
        true
    ],
    b: {
        c: 1234
    }
});

let b = ex.apply(                  
    tap(
        touch(['b']), log()
    ),
    log() 
)