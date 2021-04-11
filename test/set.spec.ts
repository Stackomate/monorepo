import { useSetBatcher } from "../src/set-batcher"
import { _setAdd, _setIsEmpty, _setRemove, _setHasOld, _setIterate, _setEquals, _setUnion, _setDifference, _setIntersection, _isSubSet, _isSuperSet, _setDisjoint} from "../src/sets/set-operations-raul"

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

    describe('equals', () => {
        it('should return false for a set that is equals in set1', () => {
            let mySet1 = new Set([1,2,3,4,5]);
            let mySet2 = new Set([5,4,3,2,1]);
            expect(_setEquals(mySet1,mySet2)).toEqual(true);
        })

        it('should return false for a set that is not equals in set1', () => {
            let mySet1 = new Set([1,2,3,4,5]);
            let mySet2 = new Set([5,4,3,2,12]);
            expect(_setEquals(mySet1,mySet2)).toEqual(false);
        })

        it('should return false for a set that is not equals a empty set', () => {
            let mySet1 = new Set([]);
            let mySet2 = new Set([5,4,3,2,12]);
            expect(_setEquals(mySet1,mySet2)).toEqual(false);
        })
    })

    describe('union', () => {
        it('should return a union of  2 sets and not to be like any set', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let mySet2 = new Set([5, 6, 7, 8]);
            let finalSet = new Set([1, 2, 3, 4, 5, 6, 7, 8]);
            let batcher = useSetBatcher(mySet);
            
            expect(_setUnion(batcher, mySet,mySet2).currentValue).toEqual(finalSet);
            expect(_setUnion(batcher, mySet,mySet2).currentValue).not.toBe(mySet);
            expect(_setUnion(batcher, mySet,mySet2).currentValue).not.toBe(mySet2);
        })

        it('should return a set just with values of first set, and be firstset', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let mySet2 = new Set([]);
            let finalSet = new Set([1, 2, 3, 4]);
            let batcher = useSetBatcher(mySet);
            
            expect(_setUnion(batcher, mySet,mySet2).currentValue).toEqual(finalSet);
            expect(_setUnion(batcher, mySet,mySet2).currentValue).toBe(mySet);
            expect(_setUnion(batcher, mySet,mySet2).currentValue).not.toBe(mySet2);
        })

        //TODO: verify why first set empty is wrong
        // it('should return false for a set that is equals in set1', () => {
        //     let mySet2 = new Set([1, 2, 3, 4]);
        //     let mySet = new Set([]);
        //     let finalSet = new Set([1, 2, 3, 4]);
        //     let batcher = useSetBatcher(mySet2);
            
        //     expect(_setUnion(batcher, mySet,mySet2).currentValue).toEqual(finalSet);
        //     expect(_setUnion(batcher, mySet,mySet2).currentValue).toBe(mySet);
        //     expect(_setUnion(batcher, mySet,mySet2).currentValue).not.toBe(mySet2);
        // })
       
    })
    
    describe('difference', () => {
        it('should return a empty set and not to be like other set', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let mySet2 = new Set([5, 6, 7, 8]);
            let fullSet = new Set([1, 2, 3, 4, 5, 6, 7, 8]);
            let finalSet = new Set([]);
            let batcher = useSetBatcher(fullSet);
            
            expect(_setDifference(batcher, mySet,mySet2).currentValue).toEqual(finalSet);
            expect(_setDifference(batcher, mySet,mySet2).currentValue).not.toBe(mySet);
            expect(_setDifference(batcher, mySet,mySet2).currentValue).not.toBe(mySet2);
        })

        it('should return the elements of set1 and to be like any set', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let mySet2 = new Set([]);
            let finalSet = new Set([]);
            let batcher = useSetBatcher(mySet);

            expect(_setDifference(batcher, mySet, mySet2).currentValue).toEqual(finalSet);
            expect(_setDifference(batcher, mySet,mySet2).currentValue).not.toBe(mySet);
            expect(_setDifference(batcher, mySet,mySet2).currentValue).not.toBe(mySet2);
        })

        it('should return the elements of set2 and to be like any set', () => {
            let mySet2 = new Set([1, 2, 3, 4]);
            let mySet = new Set([]);
            let finalSet = new Set([]);
            let batcher = useSetBatcher(mySet2);
            
            expect(_setDifference(batcher, mySet,mySet2).currentValue).toEqual(finalSet);
            expect(_setDifference(batcher, mySet,mySet2).currentValue).not.toBe(mySet);
            expect(_setDifference(batcher, mySet,mySet2).currentValue).not.toBe(mySet2);
        })
    }) 

    describe('intersection', () => {
        it('should return a set like final set and not to be like any set', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let mySet2 = new Set([3, 4, 5, 6]);
            let initialSet = new Set();
            let finalSet = new Set([3, 4]);
            let batcher = useSetBatcher(initialSet);
            
            expect(_setIntersection(batcher, mySet,mySet2).currentValue).toEqual(finalSet);
            expect(_setIntersection(batcher, mySet,mySet2).currentValue).not.toBe(mySet);
            expect(_setIntersection(batcher, mySet,mySet2).currentValue).not.toBe(mySet2);
        })

        it('should return a set like finalSet empty, and not to be like any set', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let mySet2 = new Set([8, 7, 5, 6]);
            let initialSet = new Set();
            let finalSet = new Set([]);
            let batcher = useSetBatcher(initialSet);
            
            expect(_setIntersection(batcher, mySet,mySet2).currentValue).toEqual(finalSet);
            expect(_setIntersection(batcher, mySet,mySet2).currentValue).not.toBe(mySet);
            expect(_setIntersection(batcher, mySet,mySet2).currentValue).not.toBe(mySet2);
        })
    }) 

    describe('subset', () => {
        it('should return true for a initialSet that is contained in mySet', () => {
            let initialSet = new Set([1,2]);
            let batcher = useSetBatcher(initialSet);
            let mySet = new Set([1, 2, 3, 4]);
            expect(_isSubSet(batcher, mySet)).toEqual(true);
        })

        it('should return false for a initialSet that is not contained in mySet', () => {
            let initialSet = new Set([5,6]);
            let batcher = useSetBatcher(initialSet);
            let mySet = new Set([1, 2, 3, 4]);
            expect(_isSubSet(batcher, mySet)).toEqual(false);
        })
    }) 

    describe('superset', () => {
        it('should return true for a initialSet that contains mySet', () => {
            let initialSet = new Set([1, 2, 3, 4]);
            let batcher = useSetBatcher(initialSet);
            let mySet = new Set([1, 2]);
            expect(_isSuperSet(batcher, mySet)).toEqual(true);
        })

        it('should return false for a initialSet that not contains mySet', () => {
            let initialSet = new Set([5,6]);
            let batcher = useSetBatcher(initialSet);
            let mySet = new Set([1, 2, 3, 4]);
            expect(_isSuperSet(batcher, mySet)).toEqual(false);
        })
    }) 

    describe('disjoint', () => {
        it('should return true for 2 sets that not has a intersection', () => {
            let mySet1 = new Set([1, 2, 3, 4]);
            let mySet2 = new Set([5, 6]);
            let initialSet = new Set();
            let batcher = useSetBatcher(initialSet);
            expect(_setDisjoint(batcher, mySet1, mySet2)).toEqual(true);
        })

        it('should return false for 2 sets that has a intersection', () => {
            let mySet1 = new Set([1, 2, 3, 4]);
            let mySet2 = new Set([3, 4]);
            let initialSet = new Set();
            let batcher = useSetBatcher(initialSet);
            expect(_setDisjoint(batcher, mySet1, mySet2)).toEqual(false);
        })
    }) 

})