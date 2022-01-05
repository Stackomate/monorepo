import { cloneValue, getValue } from "../../utils";
import { createArrayBatcher } from "../batcher";
import { _arrLength } from "../queries/_arrLength";
import { _arrSetLength } from "./_arrSetLength";

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