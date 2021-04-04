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