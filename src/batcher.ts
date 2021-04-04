import { batch, Fn } from "./batch-fn";

export class Batcher<T> {
    public currentValue!: T;

    public batch <A>(f1: (a: Batcher<T>) => A) : A;
    public batch <A, B>(f1: (a: Batcher<T>) => A, f2: Fn<A, B>): B;
    public batch <A, B, C>(f1: (a: Batcher<T>) => A, f2: Fn<A, B>, f3: Fn<B, C>): C;
    public batch <A, B, C, D>(f1: (a: Batcher<T>) => A, f2: Fn<A, B>, f3: Fn<B, C>, f4: Fn<C, D>): D;
    public batch <A, B, C, D, E>(f1: (a: Batcher<T>) => A, f2: Fn<A, B>, f3: Fn<B, C>, f4: Fn<C, D>, f5: Fn<D, E>): E;
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
    }

    hasChanged = false;

    /* TODO: Join with similar function, but preserve performance */
    willChange() {
        if (this.isUnlocked) {
            this.currentValue = this.currentValue;
            this.hasChanged = true;
            return false;            
        } else {
            this.currentValue = this.cloneFn(this.initialValue);
            this.hasChanged = true;
            return true;
        }
    }

    willChangeWithoutCloning() {
        if (this.isUnlocked) {
            this.currentValue = this.currentValue;
            this.hasChanged = true;
            return false;            
        } else {
            this.currentValue = this.initialValue;
            this.hasChanged = true;
            return false;
        }
    }    

    get isUnlocked() {
        return this.hasChanged || this.mutateInitial === true;
    }
}

export const value = <T>(batcher: Batcher<T>) : T => {
    return batcher.currentValue;
}

export const cloneValue = <T>(batcher: Batcher<T>) : T => {
    return batcher.cloneFn(value(batcher));
}