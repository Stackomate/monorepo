import { _getValue, hasChanged } from "../../utils";
import { createArrayBatcher } from "../batcher";
import { _arrInsert } from "./_arrInsert";

describe('insert', () => {    
    describe('non-empty array',() => {
        it('should insert a item in a specified positive index', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = createArrayBatcher(arr);
            let batcher2 = _arrInsert(batcher, 3, 5);
            expect(_getValue(batcher2)).not.toBe(arr);
            expect(_getValue(batcher2)).toEqual([1, 2, 5, 5, 3, 84, 122, 126]);
        })
        it('should insert a item in the last index', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = createArrayBatcher(arr);
            let batcher2 = _arrInsert(batcher, 7, 5);
            expect(_getValue(batcher2)).not.toBe(arr);
            expect(_getValue(batcher2)).toEqual([1, 2, 5, 3, 84, 122, 126, 5]);
        })            
        it('should insert a item in a specified negative index', () => {
            let arr = [1, 2, 8, 32, 128, 256];
            let batcher = createArrayBatcher(arr);
            let batcher2 = _arrInsert(batcher, -2, 64);
            expect(_getValue(batcher2)).not.toBe(arr);
            expect(_getValue(batcher2)).toEqual([1, 2, 8, 32, 64, 128, 256]);
        })
        it('should insert a item in a specified index', () => {
            let arr = [1, 2, 8, 32, 128, 256];
            let batcher = createArrayBatcher(arr);
            let batcher2 = _arrInsert(batcher, 0, 64);
            expect(_getValue(batcher2)).not.toBe(arr);
            expect(_getValue(batcher2)).toEqual([64, 1, 2, 8, 32, 128, 256]);
        })
        it('should not insert an item when negative index is invalid', () => {
            let arr = [1, 2, 8, 32, 128, 256];
            let batcher = createArrayBatcher(arr);
            let batcher2 = _arrInsert(batcher, -7, 64);
            expect(_getValue(batcher2)).toBe(arr);
            expect(_getValue(batcher2)).toEqual([1, 2, 8, 32, 128, 256]);
        })            
        it('should insert a item in a index out of range', () => {
            let arr = [1, 2, 8, 32, 128, 256];
            let batcher = createArrayBatcher(arr);
            let batcher2 = _arrInsert(batcher, 8, 64);
            expect(_getValue(batcher2)).not.toBe(arr);
            expect(_getValue(batcher2)).toEqual([1, 2, 8, 32, 128, 256, undefined, undefined, 64]);
        })
    })
})

describe('insert - mutable', () => {
    describe('non-empty array',() => {
        it('should insert a item in a specified positive index', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = createArrayBatcher(arr, true);
            expect(hasChanged(batcher)).toBe(false);
            let batcher2 = _arrInsert(batcher, 3, 5);
            expect(_getValue(batcher2)).toBe(arr);
            expect(hasChanged(batcher)).toBe(true);
            expect(_getValue(batcher2)).toEqual([1, 2, 5, 5, 3, 84, 122, 126]);
        })
        it('should insert a item in the last index', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = createArrayBatcher(arr, true);
            expect(hasChanged(batcher)).toBe(false);
            let batcher2 = _arrInsert(batcher, 7, 5);
            expect(hasChanged(batcher)).toBe(true);
            expect(_getValue(batcher2)).toBe(arr);
            expect(_getValue(batcher2)).toEqual([1, 2, 5, 3, 84, 122, 126, 5]);
        })            
        it('should insert a item in a specified negative index', () => {
            let arr = [1, 2, 8, 32, 128, 256];
            let batcher = createArrayBatcher(arr, true);
            expect(hasChanged(batcher)).toBe(false);
            let batcher2 = _arrInsert(batcher, -2, 64);
            expect(hasChanged(batcher)).toBe(true);                
            expect(_getValue(batcher2)).toBe(arr);
            expect(_getValue(batcher2)).toEqual([1, 2, 8, 32, 64, 128, 256]);
        })
        it('should insert a item in a specified index', () => {
            let arr = [1, 2, 8, 32, 128, 256];
            let batcher = createArrayBatcher(arr, true);
            expect(hasChanged(batcher)).toBe(false);                
            let batcher2 = _arrInsert(batcher, 0, 64);
            expect(hasChanged(batcher)).toBe(true);                
            expect(_getValue(batcher2)).toBe(arr);
            expect(_getValue(batcher2)).toEqual([64, 1, 2, 8, 32, 128, 256]);
        })
        it('should not insert an item when negative index is invalid', () => {
            let arr = [1, 2, 8, 32, 128, 256];
            let batcher = createArrayBatcher(arr, true);
            expect(hasChanged(batcher)).toBe(false);                
            let batcher2 = _arrInsert(batcher, -7, 64);
            expect(hasChanged(batcher)).toBe(false);                
            expect(_getValue(batcher2)).toBe(arr);
            expect(_getValue(batcher2)).toEqual([1, 2, 8, 32, 128, 256]);
        })            
        it('should insert a item in a index out of range', () => {
            let arr = [1, 2, 8, 32, 128, 256];
            let batcher = createArrayBatcher(arr, true);
            expect(hasChanged(batcher)).toBe(false);                
            let batcher2 = _arrInsert(batcher, 8, 64);
            expect(hasChanged(batcher)).toBe(true);                
            expect(_getValue(batcher2)).toBe(arr);
            expect(_getValue(batcher2)).toEqual([1, 2, 8, 32, 128, 256, undefined, undefined, 64]);
        })
    })
})