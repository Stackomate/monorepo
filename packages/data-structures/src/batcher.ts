import { batch, Fn } from "./batch-fn";

export class Batcher<T> {
    public currentValue!: T;

    public run <A>(f1: (a: Batcher<T>) => A) : A;
    public run <A, B>(f1: (a: Batcher<T>) => A, f2: Fn<A, B>): B;
    public run <A, B, C>(f1: (a: Batcher<T>) => A, f2: Fn<A, B>, f3: Fn<B, C>): C;
    public run <A, B, C, D>(f1: (a: Batcher<T>) => A, f2: Fn<A, B>, f3: Fn<B, C>, f4: Fn<C, D>): D;
    public run <A, B, C, D, E>(f1: (a: Batcher<T>) => A, f2: Fn<A, B>, f3: Fn<B, C>, f4: Fn<C, D>, f5: Fn<D, E>): E;
    public run <A, B, C, D, E, F>(f1: (a: Batcher<T>) => A, f2: Fn<A, B>, f3: Fn<B, C>, f4: Fn<C, D>, f5: Fn<D, E>, f6: Fn<E, F>): F;
    public run <Q>(...args: any) : Q    

    public run(...ops: any) {
        return batch(this, ...ops);
    }

    /* TODO: Fix tests and add $ */
    // public $ = this.batch;

    constructor(
        public initialValue: T,
        public mutateInitial: boolean,
        /* TODO:  Improve typing */
        public cloneFn: (a: T, batcher: Batcher<T>, ...args: any[]) => T
    ) { 
        this.currentValue = initialValue;
        this.isUnlocked = mutateInitial;
    }

    hasChanged = false;
    isUnlocked = false;

    /* TODO: Join with similar function, but preserve performance */
    /* TODO: Allow for generic typings for arguments passed */
    willChange(...args: any[]) {
        if (this.isUnlocked) {
            this.hasChanged = true;
            return false;            
        } else {
            this.currentValue = this.cloneFn(this.currentValue || this.initialValue, this, ...args);
            this.isUnlocked = true;
            this.hasChanged = true;
            return true;
        }
    }

    willChangeWithoutCloning() {
        if (this.isUnlocked) {        
            this.hasChanged = true;
            return false;            
        } else {
            this.currentValue = this.currentValue || this.initialValue;
            this.isUnlocked = true;            
            this.hasChanged = true;
            return false;
        }
    }

    lock() {
        this.isUnlocked = false;
        /* We should not change .hasChanged here, since a batcher can be locked and contain changes */
    }
 
}