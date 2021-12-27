import { createArrayBatcher } from "./batcher"
import { _arrMap } from "./operations/_arrMap";
import { _arrFilter } from "./operations/_arrFilter";
import { _arrInsert } from "./operations/_arrInsert";
import { _arrRemove } from "./operations/_arrRemove";
import { _arrDel } from "./operations/_arrDel";
import { _arrTrimLength } from "./operations/_arrTrimLength";
import { _arrIndexDefined } from "./queries/_arrIndexDefined";
import { _arrAt } from "./queries/_arrAt";
import { _arrLastIndex } from "./queries/_arrLastIndex";
import { _arrSetLength } from "./operations/_arrSetLength";
import { _arrLength } from "./queries/_arrLength";
import { _arrIndexAt } from "./queries/_arrIndexAt";
import { arrFilterForLocked } from "./operations/filter-for-locked";
import { arrFilterForUnlocked } from "./operations/filter-for-unlocked";

import { cloneValue, getValue, hasChanged } from "../utils";
import { _arrSetIndex } from "./operations/_arrSetIndex";

describe('Array exports', () => {

    describe('setIndex', () => {
        it('should set undefined for empty index greater than array length', () => {
            let arr: Array<number | undefined> = [];
            arr.length = 2;
            let batcher = createArrayBatcher(arr);
            expect(batcher.currentValue).toEqual([undefined, undefined])
            expect(batcher.currentValue.length).toBe(2);
            let b2 = _arrSetIndex(batcher, 4, undefined);
            expect(getValue(b2)).not.toBe(arr);
            expect(batcher.currentValue.length).toBe(5);
        })
    })

    describe('indexAt', () => {
        describe('should return input when >= 0 and walk backwards when <0', () => {
            it('for array with 4 items', () => {
                let arr = [22, 12, 67, 33];
                let batcher = createArrayBatcher(arr);
                expect(_arrIndexAt(batcher, 0)).toBe(0);
                expect(_arrIndexAt(batcher, 10)).toBe(10);
                expect(_arrIndexAt(batcher, 2)).toBe(2);
                expect(_arrIndexAt(batcher, -1)).toBe(3);
                expect(_arrIndexAt(batcher, -2)).toBe(2);
                expect(_arrIndexAt(batcher, -4)).toBe(0);
                expect(_arrIndexAt(batcher, -5)).toBe(-1);
                expect(_arrIndexAt(batcher, -10)).toBe(-6);
            })

            it('for array with 7 items', () => {
                let arr = [22, 12, 67, 33, 18, 99, 10];
                let batcher = createArrayBatcher(arr);
                expect(_arrIndexAt(batcher, 0)).toBe(0);
                expect(_arrIndexAt(batcher, 10)).toBe(10);
                expect(_arrIndexAt(batcher, 2)).toBe(2);
                expect(_arrIndexAt(batcher, 4)).toBe(4);
                expect(_arrIndexAt(batcher, -1)).toBe(6);
                expect(_arrIndexAt(batcher, -2)).toBe(5);
                expect(_arrIndexAt(batcher, -4)).toBe(3);
                expect(_arrIndexAt(batcher, -5)).toBe(2);
                expect(_arrIndexAt(batcher, -7)).toBe(0)
                expect(_arrIndexAt(batcher, -10)).toBe(-3);
            })            
        })
    })

    describe('lastIndex', () => {
        describe('in empty array', () => {
            it ('should return -1', () => {
                let arr: number[] = [];
                let batcher = createArrayBatcher(arr);
                expect(_arrLastIndex(batcher)).toBe(-1);
            })
        })

        describe('in non-empty array', () => {
            it ('should return length - 1', () => {
                let arr = ['a', 'b', 'c'];
                let batcher = createArrayBatcher(arr);
                expect(_arrLastIndex(batcher)).toBe(2);

                let arr2 = ['a', 'b', 'c', 'd', 'e'];
                let batcher2 = createArrayBatcher(arr2);
                expect(_arrLastIndex(batcher2)).toBe(4);                
            })
        })
    })

    describe('length', () => {
        describe('in empty array', () => {
            it ('should return 0', () => {
                let arr: number[] = [];
                let batcher = createArrayBatcher(arr);
                expect(_arrLength(batcher)).toBe(0);
            })
        })

        describe('in non-empty array', () => {
            describe('without voids', () => {
                it('should return 5', () => {
                    let arr = ['a', 'b', 'c', 'd', 'e'];
                    let batcher = createArrayBatcher(arr);
                    expect(_arrLength(batcher)).toBe(5);
                })
    
                it('should return 3', () => {
                    let arr = ['x', 'y', 'z'];
                    let batcher = createArrayBatcher(arr);
                    expect(_arrLength(batcher)).toBe(3);
                })
            })

            describe('with voids', () => {
                it('should return 30', () => {
                    let arr: void[]= [];
                    arr.length = 30;
                    let batcher = createArrayBatcher(arr);
                    expect(_arrLength(batcher)).toBe(30);
                })
            })
        })
    })

    describe('setLength', () => {
        describe('in array of same length', () => {
            it('should not change array of 5 items', () => {
                let arr = ['a', 'b', 'c', 'd', 'e'];
                let batcher = createArrayBatcher(arr);
                expect(_arrLength(batcher)).toBe(5);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => _arrSetLength(batcher, 5)).not.toThrow();
                expect(getValue(batcher)).toBe(arr);
                expect(arr).toEqual(snapshot1);
                expect(_arrLength(batcher)).toBe(5);
            })

            it('should not change empty array', () => {
                let arr: void[] = [];
                let batcher = createArrayBatcher(arr);
                expect(_arrLength(batcher)).toBe(0);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => _arrSetLength(batcher, 0)).not.toThrow();
                expect(getValue(batcher)).toBe(arr);
                expect(arr).toEqual(snapshot1);
                expect(_arrLength(batcher)).toBe(0);                
            })

            it('should not change empty array with negative index', () => {
                let arr: void[] = [];
                let batcher = createArrayBatcher(arr);
                expect(_arrLength(batcher)).toBe(0);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => _arrSetLength(batcher, -55)).not.toThrow();
                expect(getValue(batcher)).toBe(arr);
                expect(arr).toEqual(snapshot1);
                expect(_arrLength(batcher)).toBe(0);                          
            })

            it('should expand array of 5 items to 7', () => {
                let arr = ['a', 'b', 'c', 'd', 'e'];
                let batcher = createArrayBatcher(arr);
                expect(_arrLength(batcher)).toBe(5);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => _arrSetLength(batcher, 7)).not.toThrow();
                expect(arr).toEqual(snapshot1);
                let result = getValue(batcher);
                expect(result).not.toBe(arr);
                expect(result).toEqual(['a', 'b', 'c', 'd', 'e', undefined, undefined]);
                expect(6 in result).toBe(false);
                expect(5 in result).toBe(false);
                expect(7 in result).toBe(false);
                expect(4 in result).toBe(true);
                expect(_arrLength(batcher)).toBe(7);                
            })

            it('should trim array of 5 items to 3', () => {
                let arr = ['a', 'b', 'c', 'd', 'e'];
                let batcher = createArrayBatcher(arr);
                expect(_arrLength(batcher)).toBe(5);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => _arrSetLength(batcher, 3)).not.toThrow();
                expect(arr).toEqual(snapshot1);
                let result = getValue(batcher);
                expect(result).not.toBe(arr);
                expect(result).toEqual(['a', 'b', 'c']);
                expect(2 in result).toBe(true);
                expect(4 in result).toBe(false);
                expect(3 in result).toBe(false);
                expect(_arrLength(batcher)).toBe(3);                        
            })

            it('should trim array of 5 items to 3 with negative index', () => {
                let arr = ['a', 'b', 'c', 'd', 'e'];
                let batcher = createArrayBatcher(arr);
                expect(_arrLength(batcher)).toBe(5);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => _arrSetLength(batcher, -2)).not.toThrow();
                expect(arr).toEqual(snapshot1);
                let result = getValue(batcher);
                expect(result).not.toBe(arr);
                expect(result).toEqual(['a', 'b', 'c']);
                expect(2 in result).toBe(true);
                expect(4 in result).toBe(false);
                expect(3 in result).toBe(false);
                expect(_arrLength(batcher)).toBe(3);                        
            })            

            it('should trim array of 5 items to 0', () => {
                let arr = ['a', 'b', 'c', 'd', 'e'];
                let batcher = createArrayBatcher(arr);
                expect(_arrLength(batcher)).toBe(5);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => _arrSetLength(batcher, 0)).not.toThrow();
                expect(arr).toEqual(snapshot1);
                let result = getValue(batcher);
                expect(result).not.toBe(arr);
                expect(result).toEqual([]);
                expect(2 in result).toBe(false);
                expect(0 in result).toBe(false);
                expect(3 in result).toBe(false);
                expect(_arrLength(batcher)).toBe(0);                        
            })                   
            
            it('should trim array of 5 items to 0 with negative index', () => {
                let arr = ['a', 'b', 'c', 'd', 'e'];
                let batcher = createArrayBatcher(arr);
                expect(_arrLength(batcher)).toBe(5);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => _arrSetLength(batcher, -5)).not.toThrow();
                expect(arr).toEqual(snapshot1);
                let result = getValue(batcher);
                expect(result).not.toBe(arr);
                expect(result).toEqual([]);
                expect(2 in result).toBe(false);
                expect(0 in result).toBe(false);
                expect(3 in result).toBe(false);
                expect(_arrLength(batcher)).toBe(0);                        
            })              

            it('should trim array of 5 items to 0 with negative index overflow', () => {
                let arr = ['a', 'b', 'c', 'd', 'e'];
                let batcher = createArrayBatcher(arr);
                expect(_arrLength(batcher)).toBe(5);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => _arrSetLength(batcher, -49)).not.toThrow();
                expect(arr).toEqual(snapshot1);
                let result = getValue(batcher);
                expect(result).not.toBe(arr);
                expect(result).toEqual([]);
                expect(2 in result).toBe(false);
                expect(0 in result).toBe(false);
                expect(3 in result).toBe(false);
                expect(_arrLength(batcher)).toBe(0);                        
            })

            it('should reuse array in 2nd change', () => {
                let arr = ['a', 'b', 'c', 'd', 'e'];
                let batcher = createArrayBatcher(arr);
                expect(_arrLength(batcher)).toBe(5);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => _arrSetLength(batcher, -1)).not.toThrow();
                expect(arr).toEqual(snapshot1);
                let result = getValue(batcher);
                expect(result).not.toBe(arr);
                expect(result).toEqual(['a', 'b', 'c', 'd']);
                expect(5 in result).toBe(false);
                expect(3 in result).toBe(true);
                expect(4 in result).toBe(false);
                expect(_arrLength(batcher)).toBe(4);     
                expect(() => _arrSetLength(batcher, -1)).not.toThrow();                
                let result2 = getValue(batcher);
                expect(result).not.toBe(arr);
                expect(result2).toBe(result);
                expect(result).toEqual(['a', 'b', 'c']);
            })

            it('should not change empty array after 2 changes', () => {
                let arr: void[] = [];
                let batcher = createArrayBatcher(arr);
                expect(_arrLength(batcher)).toBe(0);
                let snapshot1 = cloneValue(batcher);
                expect(snapshot1).not.toBe(arr);
                expect(() => _arrSetLength(batcher, 0)).not.toThrow();
                expect(getValue(batcher)).toBe(arr);
                expect(arr).toEqual(snapshot1);
                expect(_arrLength(batcher)).toBe(0);  

                let snapshot2 = cloneValue(batcher);
                expect(snapshot2).not.toBe(arr);
                expect(snapshot2).not.toBe(snapshot1);
                expect(() => _arrSetLength(batcher, 0)).not.toThrow();
                expect(getValue(batcher)).toBe(arr);
                expect(arr).toEqual(snapshot2);
                expect(_arrLength(batcher)).toBe(0);  
            })

        })
    })

    describe('filter', () => {
        it('should filter the items', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = createArrayBatcher(arr);
            _arrFilter(batcher, (i) => i % 2 === 0)
            let s1 = getValue(batcher);
            expect(s1).not.toBe(arr);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);
            expect(arr.length).toEqual(7);
            expect(s1).toEqual([2, 84, 122, 126]);

            _arrFilter(batcher, (i) => i > 50);
            let s2 = getValue(batcher);
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
            let batcher = createArrayBatcher(arr);
            _arrFilter(batcher, (i) => i < 1000)
            let s1 = getValue(batcher);
            expect(s1).toBe(arr);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);
            expect(arr.length).toEqual(7);
            expect(s1).toEqual([1, 2, 5, 3, 84, 122, 126]);
            expect(s1.length).toEqual(7);

            _arrFilter(batcher, (i) => i > -55);
            let s2 = getValue(batcher);
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
            let batcher = createArrayBatcher(arr);
            let batcher2 = _arrMap(batcher, (i) => i % 2 === 0)
            expect(getValue(batcher2)).not.toBe(arr);
            expect(batcher).toBe(batcher2);
            expect(getValue(batcher2)).toEqual([false, true, false, false, true, true, true]);
            expect(arr.length).toEqual(7);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);

            let batcher3 = _arrMap(batcher2, (i) => i ? 1 : 0)
            expect(getValue(batcher3)).toBe(getValue(batcher2));
            expect(getValue(batcher2)).not.toBe(arr);
            expect(getValue(batcher3)).not.toBe(arr);
            expect(getValue(batcher2)).toEqual([0, 1, 0, 0, 1, 1, 1]);
            expect(getValue(batcher3)).toEqual([0, 1, 0, 0, 1, 1, 1]);            
            expect(arr.length).toEqual(7);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);    
        })

        it('should not change the array', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = createArrayBatcher(arr);
            let batcher2 = _arrMap(batcher, i => i)
            expect(getValue(batcher2)).toBe(arr);
            expect(batcher).toBe(batcher2);
            expect(getValue(batcher2)).toEqual(arr);
            expect(arr.length).toEqual(7);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);

            let batcher3 = _arrMap(batcher, i => i)
            expect(getValue(batcher3)).toBe(arr);
            expect(batcher).toBe(batcher2);
            expect(batcher3).toBe(batcher2);
            expect(getValue(batcher3)).toEqual(arr);
            expect(arr.length).toEqual(7);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]); 
            expect(getValue(batcher3)).toEqual(arr);
        })
    })
    

    /* TODO: Test references */
    describe ('remove', () => {
        describe('in a empty array', () => {
            it('should not change array', ()=>{
                let emptyArr: number[] = [];
                let batcher = createArrayBatcher(emptyArr);
                let r1 = _arrRemove(batcher,2);
                expect(getValue(r1)).toBe(emptyArr)
            })    
        })
        describe('in a non-empty array', () =>{
            it('should remove the index of array referenced', () => {
                let arr = [1, 4, 7, 9, 15];
                let batcher = createArrayBatcher(arr);
                let r1 = _arrRemove(batcher, 2);
                expect(getValue(r1)).toEqual([1, 4, 9, 15]);
                expect(getValue(r1)).not.toBe(arr);
            })

            it('should remove the index of array referenced (with void spaces)', () => {
                let arr = [];
                arr[3] = 15;
                let batcher = createArrayBatcher(arr);
                expect(getValue(batcher)).toEqual([undefined, undefined, undefined, 15]);
                let r1 = _arrRemove(batcher, 1);
                expect(getValue(r1)).toEqual([undefined, undefined, 15]);
                expect(getValue(r1)).not.toBe(arr);
            })

            it('should remove the index of array referenced (with void spaces), with a negative index', () => {
                let arr = [];
                arr[3] = 15;
                arr.length = 5;
                let batcher = createArrayBatcher(arr);
                expect(getValue(batcher)).toEqual([undefined, undefined, undefined, 15, undefined]);
                let r1 = _arrRemove(batcher, -2);
                expect(getValue(r1)).toEqual([undefined, undefined, undefined, undefined]);
                expect(getValue(r1)).not.toBe(arr);
            })       
            
            it('should not remove the index of array referenced (with void spaces), with an invalid index', () => {
                let arr = [1, 4, 7, 9, 15];
                let batcher = createArrayBatcher(arr);
                let r1 = _arrRemove(batcher, 5);
                expect(getValue(r1)).toEqual([1, 4, 7, 9, 15]);
                expect(getValue(r1)).toBe(arr);
            })

            it('should not remove the index of array referenced (with void spaces), with an invalid negative index', () => {
                let arr = [1, 4, 7, 9, 15];
                let batcher = createArrayBatcher(arr);
                let r1 = _arrRemove(batcher, -6);
                expect(getValue(r1)).toEqual([1, 4, 7, 9, 15]);
                expect(getValue(r1)).toBe(arr);
            })

            it('should remove the index of array referenced, with a negative index', () => {
                let arr = [1, 4, 7, 9, 15];
                let batcher = createArrayBatcher(arr);
                let r1 = _arrRemove(batcher,-2);
                expect(getValue(r1)).toEqual([1, 4, 7, 15]);
                expect(getValue(r1)).not.toBe(arr);
            })

            it('should not change the array', () => {
                let arr = [1, 4, 7, 9, 15];
                let batcher = createArrayBatcher(arr);
                let r1 = _arrRemove(batcher, 7);
                expect(getValue(r1)).toEqual([1, 4, 7, 9, 15]);
                expect(getValue(r1)).toBe(arr);
            })    
        })
       
    })

    describe ('remove mutable', () => {
        describe('in a empty array', () => {
            it('should not change array', ()=>{
                let emptyArr: number[] = [];
                let batcher = createArrayBatcher(emptyArr, true);
                let r1 = _arrRemove(batcher,2);
                expect(hasChanged(r1)).toBe(false);
                expect(getValue(r1)).toBe(emptyArr)
            })    
        })
        describe('in a non-empty array', () =>{
            it('should remove the index of array referenced', () => {
                let arr = [1, 4, 7, 9, 15];
                let batcher = createArrayBatcher(arr, true);
                let r1 = _arrRemove(batcher, 2);
                expect(hasChanged(r1)).toBe(true);
                expect(getValue(r1)).toEqual([1, 4, 9, 15]);
                expect(getValue(r1)).toBe(arr);
            })

            it('should remove the index of array referenced (with void spaces)', () => {
                let arr = [];
                arr[3] = 15;
                let batcher = createArrayBatcher(arr, true);
                expect(getValue(batcher)).toEqual([undefined, undefined, undefined, 15]);
                let r1 = _arrRemove(batcher, 1);
                expect(hasChanged(r1)).toBe(true);
                expect(getValue(r1)).toEqual([undefined, undefined, 15]);
                expect(getValue(r1)).toBe(arr);
            })

            it('should remove the index of array referenced (with void spaces), with a negative index', () => {
                let arr = [];
                arr[3] = 15;
                arr.length = 5;
                let batcher = createArrayBatcher(arr, true);
                expect(getValue(batcher)).toEqual([undefined, undefined, undefined, 15, undefined]);
                let r1 = _arrRemove(batcher, -2);
                expect(hasChanged(r1)).toBe(true);                
                expect(getValue(r1)).toEqual([undefined, undefined, undefined, undefined]);
                expect(getValue(r1)).toBe(arr);
            })       
            
            it('should not remove the index of array referenced (with void spaces), with an invalid index', () => {
                let arr = [1, 4, 7, 9, 15];
                let batcher = createArrayBatcher(arr, true);
                let r1 = _arrRemove(batcher, 5);
                expect(getValue(r1)).toEqual([1, 4, 7, 9, 15]);
                expect(hasChanged(r1)).toBe(false);                
                expect(getValue(r1)).toBe(arr);
            })

            it('should not remove the index of array referenced (with void spaces), with an invalid negative index', () => {
                let arr = [1, 4, 7, 9, 15];
                let batcher = createArrayBatcher(arr, true);
                let r1 = _arrRemove(batcher, -6);
                expect(getValue(r1)).toEqual([1, 4, 7, 9, 15]);
                expect(getValue(r1)).toBe(arr);
                expect(hasChanged(r1)).toBe(false);                
            })

            it('should remove the index of array referenced, with a negative index', () => {
                let arr = [1, 4, 7, 9, 15];
                let batcher = createArrayBatcher(arr, true);
                let r1 = _arrRemove(batcher,-2);
                expect(getValue(r1)).toEqual([1, 4, 7, 15]);
                expect(getValue(r1)).toBe(arr);
                expect(hasChanged(r1)).toBe(true);                
            })

            it('should not change the array', () => {
                let arr = [1, 4, 7, 9, 15];
                let batcher = createArrayBatcher(arr, true);
                let r1 = _arrRemove(batcher, 7);
                expect(getValue(r1)).toEqual([1, 4, 7, 9, 15]);
                expect(getValue(r1)).toBe(arr);
                expect(hasChanged(r1)).toBe(false);                
            })    
        })
       
    })

    describe ('trimLength', () => {   
        describe('in a non-empty array', () => {
            it('should remove all undefined positions of array', () => {
                let arr = [1, 5, 8, 19, 22];
                let batcher = createArrayBatcher(arr);
                let batcher2 = _arrSetLength(batcher, 10);
                expect(getValue(batcher2)).not.toBe(arr);
                batcher2 = _arrTrimLength(batcher);
                expect(getValue(batcher2)).toEqual([1, 5, 8, 19, 22]);
            })
        })
        describe('in a empty array', () => {
            it('should remove all undefined positions of array and return a empty array', () => {
                let emptyArr : number[] = [];
                let batcher = createArrayBatcher(emptyArr);
                let batcher2 = _arrSetLength(batcher, 3);
                expect(getValue(batcher2)).not.toBe(emptyArr);
                batcher2 = _arrTrimLength(batcher);
                expect(getValue(batcher2)).toEqual([]);
            })
        })
    })

    describe('del', () => {
        describe('non-empty array', () => {
            it('should use a positive index and has a undefined value on a deleted position', () => {
                let arr = [1, 2, 5, 3, 84, 122, 126];
                let batcher = createArrayBatcher(arr);
                let batcher2 = _arrDel(batcher, 3);
                expect(getValue(batcher2)).not.toBe(arr);
                expect(getValue(batcher2)).toEqual([1, 2, 5, undefined, 84, 122, 126]);
            })

            it('should use a negative index and has a undefined value on a deleted position', () => {
                let arr = [1, 8, 11, 32, 4, 122, 149];
                let batcher = createArrayBatcher(arr);
                let batcher2 = _arrDel(batcher, -2);
                expect(getValue(batcher2)).not.toBe(arr);
                expect(getValue(batcher2)).toEqual([1, 8, 11, 32, 4, undefined, 149]);
            })
            
            it('should use a index out of range and has a toBe = true for batcher and array', () => {
                let arr = [1, 8, 11, 32, 4, 122, 149];
                let batcher = createArrayBatcher(arr);
                let batcher2 = _arrDel(batcher, 9);
                expect(getValue(batcher2)).toBe(arr);
                expect(getValue(batcher2)).toEqual([1, 8, 11, 32, 4, 122, 149]);
            })


        })
        describe('empty array', () => {
            it('should to be true with array and batcher', () => {
                let emptyArr : number[] = [];
                let batcher = createArrayBatcher(emptyArr);
                let batcher2 = _arrDel(batcher, 2);
                expect(getValue(batcher2)).toBe(emptyArr);
            })
        })
    })

    describe('at', () => {    
        describe('non-empty arrays', () => {
            it('should return the item in a positive index referenced', () => {
                let arr = [1, 2, 5, 3, 84, 122, 126];
                let batcher = createArrayBatcher(arr);
                let item = _arrAt(batcher, 4);
                expect(item).toBe(arr[4]);
                expect(item).toEqual(84);
            })

            it('should return the item in a negative index referenced', () => {
                let arr = [1, 2, 5, 3, 84, 122, 126];
                let batcher = createArrayBatcher(arr);
                let item = _arrAt(batcher, -2);
                expect(item).toBe(arr[5]);
                expect(item).toEqual(122);
            })

            it('should return the item undefined in a index out of array', () => {
                let arr = [1, 2, 5, 3, 84, 122, 126];
                let batcher = createArrayBatcher(arr);
                let item = _arrAt(batcher, 10);
                expect(item).toBe(undefined);
                expect(item).toEqual(undefined);
            })
        })
        describe('empty array', () => {
            it('should return the item in a positive index referenced', () => {
                let emptyArr : number[] = [];
                let batcher = createArrayBatcher(emptyArr);
                let item = _arrAt(batcher, 5);
                expect(item).toBe(undefined);
            })
        })
        
    })

    describe('insert', () => {    
        describe('non-empty array',() => {
            it('should insert a item in a specified positive index', () => {
                let arr = [1, 2, 5, 3, 84, 122, 126];
                let batcher = createArrayBatcher(arr);
                let batcher2 = _arrInsert(batcher, 3, 5);
                expect(getValue(batcher2)).not.toBe(arr);
                expect(getValue(batcher2)).toEqual([1, 2, 5, 5, 3, 84, 122, 126]);
            })
            it('should insert a item in the last index', () => {
                let arr = [1, 2, 5, 3, 84, 122, 126];
                let batcher = createArrayBatcher(arr);
                let batcher2 = _arrInsert(batcher, 7, 5);
                expect(getValue(batcher2)).not.toBe(arr);
                expect(getValue(batcher2)).toEqual([1, 2, 5, 3, 84, 122, 126, 5]);
            })            
            it('should insert a item in a specified negative index', () => {
                let arr = [1, 2, 8, 32, 128, 256];
                let batcher = createArrayBatcher(arr);
                let batcher2 = _arrInsert(batcher, -2, 64);
                expect(getValue(batcher2)).not.toBe(arr);
                expect(getValue(batcher2)).toEqual([1, 2, 8, 32, 64, 128, 256]);
            })
            it('should insert a item in a specified index', () => {
                let arr = [1, 2, 8, 32, 128, 256];
                let batcher = createArrayBatcher(arr);
                let batcher2 = _arrInsert(batcher, 0, 64);
                expect(getValue(batcher2)).not.toBe(arr);
                expect(getValue(batcher2)).toEqual([64, 1, 2, 8, 32, 128, 256]);
            })
            it('should not insert an item when negative index is invalid', () => {
                let arr = [1, 2, 8, 32, 128, 256];
                let batcher = createArrayBatcher(arr);
                let batcher2 = _arrInsert(batcher, -7, 64);
                expect(getValue(batcher2)).toBe(arr);
                expect(getValue(batcher2)).toEqual([1, 2, 8, 32, 128, 256]);
            })            
            it('should insert a item in a index out of range', () => {
                let arr = [1, 2, 8, 32, 128, 256];
                let batcher = createArrayBatcher(arr);
                let batcher2 = _arrInsert(batcher, 8, 64);
                expect(getValue(batcher2)).not.toBe(arr);
                expect(getValue(batcher2)).toEqual([1, 2, 8, 32, 128, 256, undefined, undefined, 64]);
            })
        })
    })

    describe('index defined', () => {
        describe('should verify a positive index', () => {
            it('should verify a index not void', () => {
                let arr = [1, 2, 5, 3, 84, 122, 126];
                let batcher = createArrayBatcher(arr);
                let batcher2 = _arrIndexDefined(batcher, 3);
                expect(batcher2).toEqual(true);
            })
            it('should verify a index is void in a index out of range', () => {
                let arr = [1, 2];
                let batcher = createArrayBatcher(arr);
                let batcher2 = _arrIndexDefined(batcher, 3);
                expect(batcher2).toEqual(false);
            })
            it('should verify a index is void in a void array', () => {
                let emptyArr: number[] = [];
                let batcher = createArrayBatcher(emptyArr);
                let batcher2 = _arrIndexDefined(batcher, 3);
                expect(batcher2).toEqual(false);
            })
        })
        describe('should verify a negative index', () => {
            it('should verify a index not void', () => {
                let arr = [1, 2, 5, 3, 84, 122, 126];
                let batcher = createArrayBatcher(arr);
                let batcher2 = _arrIndexDefined(batcher, -3);
                expect(batcher2).toEqual(true);
            })
            it('should verify a negative index is void in a void array', () => {
                let emptyArr: number[] = [];
                let batcher = createArrayBatcher(emptyArr);
                let batcher2 = _arrIndexDefined(batcher, -3);
                expect(batcher2).toEqual(false);
            })
        })
    })


});


describe('Array protected methods', () => {
    describe('filterForUnlocked', () => {
        it('should filter the items', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = createArrayBatcher(arr, true);
            arrFilterForUnlocked(batcher, (i) => i % 2 === 0)
            expect(getValue(batcher)).toBe(arr);
            expect(arr).toEqual([2, 84, 122, 126])
            expect(arr.length).toEqual(4)
        })

        it('should filter the items', () => {
            let arr = [-12, 2, 5, 3, 84, 122, 126];
            let batcher = createArrayBatcher(arr, true);
            arrFilterForUnlocked(batcher, (i) => i % 2 === 0)
            expect(getValue(batcher)).toBe(arr);
            expect(arr).toEqual([-12, 2, 84, 122, 126])
            expect(arr.length).toEqual(5);
        })
        
        it('should filter the items', () => {
            let arr = [-12, 2, 5, 3, 84, 122, 1265];
            let batcher = createArrayBatcher(arr, true);
            arrFilterForUnlocked(batcher, (i) => i % 2 === 0)
            expect(getValue(batcher)).toBe(arr);
            expect(arr).toEqual([-12, 2, 84, 122])
            expect(arr.length).toEqual(4);
        })
    })

    describe('filterForLocked', () => {
        it('should filter the items', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = createArrayBatcher(arr);
            arrFilterForLocked(batcher, (i) => i % 2 === 0)
            let s1 = getValue(batcher);
            expect(s1).not.toBe(arr);
            expect(s1).toEqual([2, 84, 122, 126]);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);
            expect(arr.length).toEqual(7)
            expect(s1.length).toEqual(4)
        })

        it('should filter the items', () => {
            let arr = [-12, 2, 5, 3, 84, 122, 126];
            let batcher = createArrayBatcher(arr);
            arrFilterForLocked(batcher, (i) => i % 2 === 0)
            let s1 = getValue(batcher);
            expect(s1).not.toBe(arr);
            expect(s1).toEqual([-12, 2, 84, 122, 126]);
            expect(s1.length).toEqual(5);
            expect(arr).toEqual([-12, 2, 5, 3, 84, 122, 126]);
            expect(arr.length).toEqual(7);
        })      
        
        it('should filter the items', () => {
            let arr = [-12, 2, 5, 3, 84, 122, 1265];
            let batcher = createArrayBatcher(arr);
            arrFilterForLocked(batcher, (i) => i % 2 === 0)
            let s1 = getValue(batcher);
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
            let batcher = createArrayBatcher(arr);
            let batcher2 = _arrMap(batcher, (i) => i % 2 === 0)
            expect(getValue(batcher2)).not.toBe(arr);
            expect(batcher).toBe(batcher2);
            expect(getValue(batcher2)).toEqual([false, true, false, false, true, true, true]);
            expect(arr.length).toEqual(7);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);
        })

        it('should map and preserve array', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = createArrayBatcher(arr);
            let batcher2 = _arrMap(batcher, i => i)
            expect(getValue(batcher2)).toBe(arr);
            expect(batcher).toBe(batcher2);
            expect(getValue(batcher2)).toEqual(arr);
            expect(arr.length).toEqual(7);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);
        })
    })

    describe('mapForUnlocked', () => {
        it('should map the items into new array', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = createArrayBatcher(arr, true);
            let batcher2 = _arrMap(batcher, (i) => i % 2 === 0)
            expect(getValue(batcher2)).toBe(arr);
            expect(batcher).toBe(batcher2);
            expect(getValue(batcher2)).toEqual([false, true, false, false, true, true, true]);
            expect(arr.length).toEqual(7);
            expect(arr).toEqual([false, true, false, false, true, true, true]);
        })

        it('should map and preserve array', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = createArrayBatcher(arr, true);
            let batcher2 = _arrMap(batcher, i => i)
            expect(getValue(batcher2)).toBe(arr);
            expect(batcher).toBe(batcher2);
            expect(getValue(batcher2)).toEqual(arr);
            expect(arr.length).toEqual(7);
            expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);
        })
    })    
})