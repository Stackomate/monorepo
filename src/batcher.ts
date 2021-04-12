import { batch, Fn } from "./batch-fn";

export class Batcher<T> {
    public currentValue!: T;

    public batch <A>(f1: (a: Batcher<T>) => A) : A;
    public batch <A, B>(f1: (a: Batcher<T>) => A, f2: Fn<A, B>): B;
    public batch <A, B, C>(f1: (a: Batcher<T>) => A, f2: Fn<A, B>, f3: Fn<B, C>): C;
    public batch <A, B, C, D>(f1: (a: Batcher<T>) => A, f2: Fn<A, B>, f3: Fn<B, C>, f4: Fn<C, D>): D;
    public batch <A, B, C, D, E>(f1: (a: Batcher<T>) => A, f2: Fn<A, B>, f3: Fn<B, C>, f4: Fn<C, D>, f5: Fn<D, E>): E;
    public batch <A, B, C, D, E, F>(f1: (a: Batcher<T>) => A, f2: Fn<A, B>, f3: Fn<B, C>, f4: Fn<C, D>, f5: Fn<D, E>, f6: Fn<E, F>): F;
    public batch <Q>(...args: any) : Q    

    public batch(...ops: any) {
        return batch(this, ...ops);
    }

    /* TODO: Fix tests and add $ */
    // public $ = this.batch;

    constructor(
        public initialValue: T,
        public mutateInitial: boolean,
        public cloneFn: (a: T) => T
    ) { 
        this.currentValue = initialValue;
        this.isUnlocked = mutateInitial;
    }

    hasChanged = false;
    isUnlocked = false;

    /* TODO: Join with similar function, but preserve performance */
    willChange() {
        if (this.isUnlocked) {
            this.hasChanged = true;
            return false;            
        } else {
            this.currentValue = this.cloneFn(this.initialValue);
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
            this.currentValue = this.initialValue;
            this.isUnlocked = true;            
            this.hasChanged = true;
            return false;
        }
    }

    lock() {
        this.isUnlocked = false;
    }
}

export const value = <T>(batcher: Batcher<T>) : T => {
    return batcher.currentValue;
}

export const cloneValue = <T>(batcher: Batcher<T>) : T => {
    return batcher.cloneFn(value(batcher));
}