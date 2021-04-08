import { useSetBatcher } from "../src/set-batcher"
import { _setAdd, _setIsEmpty, _setRemove, _setHasOld, _setIterate, _setEquals} from "../src/sets/set-operations-raul"

describe('Set exports', () => {
    describe('add', () => {
        it('should work as internal add', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let batcher = useSetBatcher(mySet)
            _setAdd(batcher, 10);
            expect(batcher.currentValue).not.toBe(mySet);
            expect(batcher.currentValue).toEqual(new Set([1, 2, 3, 4, 10]));
        })

        it ('should keep reference', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let batcher = useSetBatcher(mySet)
            _setAdd(batcher, 1);
            expect(batcher.currentValue).toBe(mySet);
            expect(batcher.currentValue).toEqual(new Set([1, 2, 3, 4]));            
        })
    })

    describe('remove', () => {
        it('should work as internal remove', () => {
            let mySet = new Set([1, 2, 3, 4, 10]);
            let batcher = useSetBatcher(mySet)
            _setRemove(batcher, 10);
            expect(batcher.currentValue).not.toBe(mySet);
            expect(batcher.currentValue).toEqual(new Set([1, 2, 3, 4]));
        })

        it ('should keep reference', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let batcher = useSetBatcher(mySet)
            _setRemove(batcher, 10);
            expect(batcher.currentValue).toBe(mySet);
            expect(batcher.currentValue).toEqual(new Set([1, 2, 3, 4]));            
        })
    }) 
    
    describe('isEmpty', () => {
        it('should return true for a empty Set', () => {
            let mySet = new Set();
            expect(_setIsEmpty(mySet)).toEqual(true);
        })

        it ('should return true for a non-empty Set', () => {
            let mySet = new Set([1, 2, 3, 4]);
            expect(_setIsEmpty(mySet)).toEqual(false);        
        })
    })
    
    describe('has', () => {
        it('should return true for a item that is contained in set', () => {
            let mySet = new Set([1,2,3,4,5]);
            expect(_setHasOld(mySet,4)).toEqual(true);
        })

        it('should return false for a item that is not contained in set', () => {
            let mySet = new Set([1,2,3,4,5]);
            expect(_setHasOld(mySet,12)).toEqual(false);
        })

        it('should return true for a item in a empty set', () => {
            let mySet = new Set([]);
            expect(_setHasOld(mySet,4)).toEqual(false);
        })
    })

    // describe('equals', () => {
    //     it('should return true for a item that is contained in set', () => {
    //         let mySet1 = new Set([1,2,3,4,5]);
    //         let mySet2 = new Set([5,4,3,2,1]);
    //         expect(_setHas(mySet1,mySet2)).toEqual(true);
    //     })

    //     it('should return false for a item that is not contained in set', () => {
    //         let mySet = new Set([1,2,3,4,5]);
    //         expect(_setHas(mySet,12)).toEqual(false);
    //     })

    //     it('should return true for a item in a empty set', () => {
    //         let mySet = new Set([]);
    //         expect(_setHas(mySet,4)).toEqual(false);
    //     })
    // })
    
    // describe('filter', () => {
    //     it('should work as internal filter', () => {
    //         let mySet = new Set([1, 2, 3, 4, 10]);
    //         let batcher = useSetBatcher(mySet)
    //         filter(batcher, (i) => i % 2 === 0);
    //         expect(batcher.currentValue).not.toBe(mySet);
    //         expect(batcher.currentValue).toEqual(new Set([2, 4, 10]));
    //     })

    //     it ('should keep reference', () => {
    //         let mySet = new Set([1, 2, 3, 4, 10, 55]);
    //         let batcher = useSetBatcher(mySet)
    //         filter(batcher, (i) => i < 100);
    //         expect(batcher.currentValue).toBe(mySet);
    //         expect(batcher.currentValue).toEqual(new Set([1, 2, 3, 4, 10, 55]));            
    //     })
    // })    

})