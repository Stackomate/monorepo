import { useArrayBatcher } from "../src/array/array-batcher"
import { arrFilter, arrIndexAt, arrLastIndex, arrLength, arrMap, arrSetLength } from "../src/array/array-operations";
import { arrFilterForLocked } from "../src/array/filter-for-locked";
import { arrFilterForUnlocked } from "../src/array/filter-for-unlocked";
import { arrMapForLocked } from "../src/array/map-for-locked";
import { arrMapForUnlocked } from "../src/array/map-for-unlocked";
import { cloneValue, value } from "../src/batcher";

describe('Array exports', () => {
    describe('indexAt', () => {
        describe('should return input when >= 0 and walk backwards when <0', () => {
            it('for array with 4 items', () => {
                let arr = [22, 12, 67, 33];
                let batcher = useArrayBatcher(arr);
                expect(arrIndexAt(batcher, 0)).toBe(0);
                expect(arrIndexAt(batcher, 10)).toBe(10);
                expect(arrIndexAt(batcher, 2)).toBe(2);
                expect(arrIndexAt(batcher, -1)).toBe(3);
                expect(arrIndexAt(batcher, -2)).toBe(2);
                expect(arrIndexAt(batcher, -4)).toBe(0);
                expect(arrIndexAt(batcher, -5)).toBe(-1);
                expect(arrIndexAt(batcher, -10)).toBe(-6);
            })

            it('for array with 7 items', () => {
                let arr = [22, 12, 67, 33, 18, 99, 10];
                let batcher = useArrayBatcher(arr);
                expect(arrIndexAt(batcher, 0)).toBe(0);
                expect(arrIndexAt(batcher, 10)).toBe(10);
                expect(arrIndexAt(batcher, 2)).toBe(2);
                expect(arrIndexAt(batcher, 4)).toBe(4);
                expect(arrIndexAt(batcher, -1)).toBe(6);
                expect(arrIndexAt(batcher, -2)).toBe(5);
                expect(arrIndexAt(batcher, -4)).toBe(3);
                expect(arrIndexAt(batcher, -5)).toBe(2);
                expect(arrIndexAt(batcher, -7)).toBe(0)
                expect(arrIndexAt(batcher, -10)).toBe(-3);
            })            
        })
    })

    describe('lastIndex', () => {
        describe('in empty array', () => {
            it ('should return -1', () => {
                let arr: number[] = [];
                let batcher = useArrayBatcher(arr);
                expect(arrLastIndex(batcher)).toBe(-1);
            })
        })

        describe('in non-empty array', () => {
            it ('should return length - 1', () => {
                let arr = ['a', 'b', 'c'];
                let batcher = useArrayBatcher(arr);
                expect(arrLastIndex(batcher)).toBe(2);

                let arr2 = ['a', 'b', 'c', 'd', 'e'];
                let batcher2 = useArrayBatcher(arr2);
                expect(arrLastIndex(batcher2)).toBe(4);                
            })
        })
    })

    describe('length', () => {
        describe('in empty array', () => {
            it ('should return 0', () => {
                let arr: number[] = [];
                let batcher = useArrayBatcher(arr);
                expect(arrLength(batcher)).toBe(0);
            })
        })

        describe('in non-empty array', () => {
            describe('without voids', () => {
                it('should return 5', () => {
                    let arr = ['a', 'b', 'c', 'd', 'e'];
                    let batcher = useArrayBatcher(arr);
                    expect(arrLength(batcher)).toBe(5);
                })
    
                it('should return 3', () => {
                    let arr = ['x', 'y', 'z'];
                    let batcher = useArrayBatcher(arr);
                    expect(arrLength(batcher)).toBe(3);
                })
            })

            describe('with voids', () => {
                it('should return 30', () => {
                    let arr: void[]= [];
                    arr.length = 30;
                    let batcher = useArrayBatcher(arr);
                    expect(arrLength(batcher)).toBe(30);
                })
            })
        })
    })

    describe('setLength', () => {
        describe('in array of same length', () => {
            it('should not change array of 5 items', () => {
                let arr = ['a', 'b', 'c', 'd', 'e'];
                let batcher = useArrayBatcher(arr);
                expect(arrLength(batcher)).toBe(5);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => arrSetLength(batcher, 5)).not.toThrow();
                expect(value(batcher)).toBe(arr);
                expect(arr).toEqual(snapshot1);
                expect(arrLength(batcher)).toBe(5);
            })

            it('should not change empty array', () => {
                let arr: void[] = [];
                let batcher = useArrayBatcher(arr);
                expect(arrLength(batcher)).toBe(0);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => arrSetLength(batcher, 0)).not.toThrow();
                expect(value(batcher)).toBe(arr);
                expect(arr).toEqual(snapshot1);
                expect(arrLength(batcher)).toBe(0);                
            })

            it('should not change empty array with negative index', () => {
                let arr: void[] = [];
                let batcher = useArrayBatcher(arr);
                expect(arrLength(batcher)).toBe(0);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => arrSetLength(batcher, -55)).not.toThrow();
                expect(value(batcher)).toBe(arr);
                expect(arr).toEqual(snapshot1);
                expect(arrLength(batcher)).toBe(0);                          
            })

            it('should expand array of 5 items to 7', () => {
                let arr = ['a', 'b', 'c', 'd', 'e'];
                let batcher = useArrayBatcher(arr);
                expect(arrLength(batcher)).toBe(5);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => arrSetLength(batcher, 7)).not.toThrow();
                expect(arr).toEqual(snapshot1);
                let result = value(batcher);
                expect(result).not.toBe(arr);
                expect(result).toEqual(['a', 'b', 'c', 'd', 'e', undefined, undefined]);
                expect(6 in result).toBe(false);
                expect(5 in result).toBe(false);
                expect(7 in result).toBe(false);
                expect(4 in result).toBe(true);
                expect(arrLength(batcher)).toBe(7);                
            })

            it('should trim array of 5 items to 3', () => {
                let arr = ['a', 'b', 'c', 'd', 'e'];
                let batcher = useArrayBatcher(arr);
                expect(arrLength(batcher)).toBe(5);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => arrSetLength(batcher, 3)).not.toThrow();
                expect(arr).toEqual(snapshot1);
                let result = value(batcher);
                expect(result).not.toBe(arr);
                expect(result).toEqual(['a', 'b', 'c']);
                expect(2 in result).toBe(true);
                expect(4 in result).toBe(false);
                expect(3 in result).toBe(false);
                expect(arrLength(batcher)).toBe(3);                        
            })

            it('should trim array of 5 items to 3 with negative index', () => {
                let arr = ['a', 'b', 'c', 'd', 'e'];
                let batcher = useArrayBatcher(arr);
                expect(arrLength(batcher)).toBe(5);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => arrSetLength(batcher, -2)).not.toThrow();
                expect(arr).toEqual(snapshot1);
                let result = value(batcher);
                expect(result).not.toBe(arr);
                expect(result).toEqual(['a', 'b', 'c']);
                expect(2 in result).toBe(true);
                expect(4 in result).toBe(false);
                expect(3 in result).toBe(false);
                expect(arrLength(batcher)).toBe(3);                        
            })            

            it('should trim array of 5 items to 0', () => {
                let arr = ['a', 'b', 'c', 'd', 'e'];
                let batcher = useArrayBatcher(arr);
                expect(arrLength(batcher)).toBe(5);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => arrSetLength(batcher, 0)).not.toThrow();
                expect(arr).toEqual(snapshot1);
                let result = value(batcher);
                expect(result).not.toBe(arr);
                expect(result).toEqual([]);
                expect(2 in result).toBe(false);
                expect(0 in result).toBe(false);
                expect(3 in result).toBe(false);
                expect(arrLength(batcher)).toBe(0);                        
            })                   
            
            it('should trim array of 5 items to 0 with negative index', () => {
                let arr = ['a', 'b', 'c', 'd', 'e'];
                let batcher = useArrayBatcher(arr);
                expect(arrLength(batcher)).toBe(5);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => arrSetLength(batcher, -5)).not.toThrow();
                expect(arr).toEqual(snapshot1);
                let result = value(batcher);
                expect(result).not.toBe(arr);
                expect(result).toEqual([]);
                expect(2 in result).toBe(false);
                expect(0 in result).toBe(false);
                expect(3 in result).toBe(false);
                expect(arrLength(batcher)).toBe(0);                        
            })              

            it('should trim array of 5 items to 0 with negative index overflow', () => {
                let arr = ['a', 'b', 'c', 'd', 'e'];
                let batcher = useArrayBatcher(arr);
                expect(arrLength(batcher)).toBe(5);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => arrSetLength(batcher, -49)).not.toThrow();
                expect(arr).toEqual(snapshot1);
                let result = value(batcher);
                expect(result).not.toBe(arr);
                expect(result).toEqual([]);
                expect(2 in result).toBe(false);
                expect(0 in result).toBe(false);
                expect(3 in result).toBe(false);
                expect(arrLength(batcher)).toBe(0);                        
            })

            it('should reuse array in 2nd change', () => {
                let arr = ['a', 'b', 'c', 'd', 'e'];
                let batcher = useArrayBatcher(arr);
                expect(arrLength(batcher)).toBe(5);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => arrSetLength(batcher, -1)).not.toThrow();
                expect(arr).toEqual(snapshot1);
                let result = value(batcher);
                expect(result).not.toBe(arr);
                expect(result).toEqual(['a', 'b', 'c', 'd']);
                expect(5 in result).toBe(false);
                expect(3 in result).toBe(true);
                expect(4 in result).toBe(false);
                expect(arrLength(batcher)).toBe(4);     
                expect(() => arrSetLength(batcher, -1)).not.toThrow();                
                let result2 = value(batcher);
                expect(result).not.toBe(arr);
                expect(result2).toBe(result);
                expect(result).toEqual(['a', 'b', 'c']);
            })

            it('should not change empty array after 2 changes', () => {
                let arr: void[] = [];
                let batcher = useArrayBatcher(arr);
                expect(arrLength(batcher)).toBe(0);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => arrSetLength(batcher, 0)).not.toThrow();
                expect(value(batcher)).toBe(arr);
                expect(arr).toEqual(snapshot1);
                expect(arrLength(batcher)).toBe(0);  

                let snapshot2 = cloneValue(batcher);
                expect(snapshot2).not.toBe(arr);
                expect(snapshot2).not.toBe(snapshot1);
                expect(() => arrSetLength(batcher, 0)).not.toThrow();
                expect(value(batcher)).toBe(arr);
                expect(arr).toEqual(snapshot2);
                expect(arrLength(batcher)).toBe(0);  
            })

        })
    })

    describe('filter', () => {
        it('should filter the items', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = useArrayBatcher(arr);
            arrFilter(batcher, (i) => i % 2 === 0)
            let s1 = value(batcher);
            expect(s1).not.toBe(arr);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);
            expect(arr.length).toEqual(7);
            expect(s1).toEqual([2, 84, 122, 126]);

            arrFilter(batcher, (i) => i > 50);
            let s2 = value(batcher);
            expect(s2).toBe(s1);
            expect(s2).toEqual([84, 122, 126]);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);
            expect(arr.length).toEqual(7);
            expect(s1).toEqual([84, 122, 126]);
            expect(s2.length).toEqual(3);
            expect(s1.length).toEqual(3);
        })

        it('should not change the array', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = useArrayBatcher(arr);
            arrFilter(batcher, (i) => i < 1000)
            let s1 = value(batcher);
            expect(s1).toBe(arr);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);
            expect(arr.length).toEqual(7);
            expect(s1).toEqual([1, 2, 5, 3, 84, 122, 126]);
            expect(s1.length).toEqual(7);

            arrFilter(batcher, (i) => i > -55);
            let s2 = value(batcher);
            expect(s2).toBe(s1);
            expect(s1).toBe(arr);
            expect(s2).toEqual([1, 2, 5, 3, 84, 122, 126]);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);
            expect(s1).toEqual([1, 2, 5, 3, 84, 122, 126]);            
            expect(arr.length).toEqual(7);
            expect(s2.length).toEqual(7);
            expect(s1.length).toEqual(7);
        })
    })

    describe('map', () => {
        it('should map the items', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = useArrayBatcher(arr);
            let batcher2 = arrMap(batcher, (i) => i % 2 === 0)
            expect(value(batcher2)).not.toBe(arr);
            expect(batcher).toBe(batcher2);
            expect(value(batcher2)).toEqual([false, true, false, false, true, true, true]);
            expect(arr.length).toEqual(7);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);

            let batcher3 = arrMap(batcher2, (i) => i ? 1 : 0)
            expect(value(batcher3)).toBe(value(batcher2));
            expect(value(batcher2)).not.toBe(arr);
            expect(value(batcher3)).not.toBe(arr);
            expect(value(batcher2)).toEqual([0, 1, 0, 0, 1, 1, 1]);
            expect(value(batcher3)).toEqual([0, 1, 0, 0, 1, 1, 1]);            
            expect(arr.length).toEqual(7);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);    
        })

        it('should not change the array', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = useArrayBatcher(arr);
            let batcher2 = arrMapForUnlocked(batcher, i => i)
            expect(value(batcher2)).toBe(arr);
            expect(batcher).toBe(batcher2);
            expect(value(batcher2)).toEqual(arr);
            expect(arr.length).toEqual(7);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);

            let batcher3 = arrMapForUnlocked(batcher, i => i)
            expect(value(batcher3)).toBe(arr);
            expect(batcher).toBe(batcher2);
            expect(batcher3).toBe(batcher2);
            expect(value(batcher3)).toEqual(arr);
            expect(arr.length).toEqual(7);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]); 
            expect(value(batcher3)).toEqual(arr);
        })
    })    
});

describe('Array protected methods', () => {
    describe('filterForUnlocked', () => {
        it('should filter the items', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = useArrayBatcher(arr, true);
            arrFilterForUnlocked(batcher, (i) => i % 2 === 0)
            expect(value(batcher)).toBe(arr);
            expect(arr).toEqual([2, 84, 122, 126])
            expect(arr.length).toEqual(4)
        })

        it('should filter the items', () => {
            let arr = [-12, 2, 5, 3, 84, 122, 126];
            let batcher = useArrayBatcher(arr, true);
            arrFilterForUnlocked(batcher, (i) => i % 2 === 0)
            expect(value(batcher)).toBe(arr);
            expect(arr).toEqual([-12, 2, 84, 122, 126])
            expect(arr.length).toEqual(5);
        })
        
        it('should filter the items', () => {
            let arr = [-12, 2, 5, 3, 84, 122, 1265];
            let batcher = useArrayBatcher(arr, true);
            arrFilterForUnlocked(batcher, (i) => i % 2 === 0)
            expect(value(batcher)).toBe(arr);
            expect(arr).toEqual([-12, 2, 84, 122])
            expect(arr.length).toEqual(4);
        })
    })

    describe('filterForLocked', () => {
        it('should filter the items', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = useArrayBatcher(arr);
            arrFilterForLocked(batcher, (i) => i % 2 === 0)
            let s1 = value(batcher);
            expect(s1).not.toBe(arr);
            expect(s1).toEqual([2, 84, 122, 126]);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);
            expect(arr.length).toEqual(7)
            expect(s1.length).toEqual(4)
        })

        it('should filter the items', () => {
            let arr = [-12, 2, 5, 3, 84, 122, 126];
            let batcher = useArrayBatcher(arr);
            arrFilterForLocked(batcher, (i) => i % 2 === 0)
            let s1 = value(batcher);
            expect(s1).not.toBe(arr);
            expect(s1).toEqual([-12, 2, 84, 122, 126]);
            expect(s1.length).toEqual(5);
            expect(arr).toEqual([-12, 2, 5, 3, 84, 122, 126]);
            expect(arr.length).toEqual(7);
        })      
        
        it('should filter the items', () => {
            let arr = [-12, 2, 5, 3, 84, 122, 1265];
            let batcher = useArrayBatcher(arr);
            arrFilterForLocked(batcher, (i) => i % 2 === 0)
            let s1 = value(batcher);
            expect(s1).not.toBe(arr);
            expect(s1).toEqual([-12, 2, 84, 122])
            expect(s1.length).toEqual(4);
            expect(arr).toEqual([-12, 2, 5, 3, 84, 122, 1265]);
            expect(arr.length).toEqual(7)                 
        })                  
    })

    describe('mapForLocked', () => {
        it('should map the items into new array', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = useArrayBatcher(arr);
            let batcher2 = arrMapForLocked(batcher, (i) => i % 2 === 0)
            expect(value(batcher2)).not.toBe(arr);
            expect(batcher).toBe(batcher2);
            expect(value(batcher2)).toEqual([false, true, false, false, true, true, true]);
            expect(arr.length).toEqual(7);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);
        })

        it('should map and preserve array', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = useArrayBatcher(arr);
            let batcher2 = arrMapForLocked(batcher, i => i)
            expect(value(batcher2)).toBe(arr);
            expect(batcher).toBe(batcher2);
            expect(value(batcher2)).toEqual(arr);
            expect(arr.length).toEqual(7);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);
        })
    })

    describe('mapForUnlocked', () => {
        it('should map the items into new array', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = useArrayBatcher(arr);
            let batcher2 = arrMapForUnlocked(batcher, (i) => i % 2 === 0)
            expect(value(batcher2)).toBe(arr);
            expect(batcher).toBe(batcher2);
            expect(value(batcher2)).toEqual([false, true, false, false, true, true, true]);
            expect(arr.length).toEqual(7);
            expect(arr).toEqual([false, true, false, false, true, true, true]);
        })

        it('should map and preserve array', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = useArrayBatcher(arr);
            let batcher2 = arrMapForUnlocked(batcher, i => i)
            expect(value(batcher2)).toBe(arr);
            expect(batcher).toBe(batcher2);
            expect(value(batcher2)).toEqual(arr);
            expect(arr.length).toEqual(7);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);
        })
    })    
})