export const cloneSet = <T>(initial: Set<T>) => new Set<T>(initial);

export const createBatcher = <T>(target: Set<T>, mutate: boolean = false) => {
    return new Batcher(target, mutate, cloneSet);
}


interface Prepare {
    <T>(target: Set<T>, mutate?: boolean): Batcher<Set<T>>;
    <T>(target: undefined, mutate: undefined, batcher: Batcher<Set<T>>): Batcher<Set<T>>;
}

export const prepareBatcher: Prepare = <T>(
    target?: Set<T>, 
    mutate?: boolean, 
    batcher?: Batcher<Set<T>>) : Batcher<Set<T>> => {
    /* TODO: Remove as Set<T> */
    return batcher || createBatcher(target as Set<T>, mutate);
}

export class Batcher<T> {
    public currentValue!: T;

    constructor(
        public initialValue: T,
        public mutateInitial: boolean,
        public cloneFn: (a: T) => T
    ) { 
        this.currentValue = initialValue;
    }

    hasChanged = false;
    /* TODO: Add optional arg mutate that will overwrite default mutate */
    willChange() {
        if (this.isUnlocked) {
            this.currentValue = this.currentValue || this.initialValue;
            this.hasChanged = true;
            return false;            
        } else {
            this.currentValue = this.cloneFn(this.initialValue);
            this.hasChanged = true;
            return true;
        }
    }

    get isUnlocked() {
        return this.hasChanged || this.mutateInitial === true;
    }
}
