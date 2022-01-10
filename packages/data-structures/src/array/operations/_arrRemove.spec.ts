import { _getValue, hasChanged } from "../../utils";
import { createArrayBatcher } from "../batcher";
import { _arrRemove } from "./_arrRemove";

describe ('remove', () => {
    describe('in a empty array', () => {
        it('should not change array', ()=>{
            let emptyArr: number[] = [];
            let batcher = createArrayBatcher(emptyArr);
            let r1 = _arrRemove(batcher,2);
            expect(_getValue(r1)).toBe(emptyArr)
        })    
    })
    describe('in a non-empty array', () =>{
        it('should remove the index of array referenced', () => {
            let arr = [1, 4, 7, 9, 15];
            let batcher = createArrayBatcher(arr);
            let r1 = _arrRemove(batcher, 2);
            expect(_getValue(r1)).toEqual([1, 4, 9, 15]);
            expect(_getValue(r1)).not.toBe(arr);
        })

        it('should remove the index of array referenced (with void spaces)', () => {
            let arr = [];
            arr[3] = 15;
            let batcher = createArrayBatcher(arr);
            expect(_getValue(batcher)).toEqual([undefined, undefined, undefined, 15]);
            let r1 = _arrRemove(batcher, 1);
            expect(_getValue(r1)).toEqual([undefined, undefined, 15]);
            expect(_getValue(r1)).not.toBe(arr);
        })

        it('should remove the index of array referenced (with void spaces), with a negative index', () => {
            let arr = [];
            arr[3] = 15;
            arr.length = 5;
            let batcher = createArrayBatcher(arr);
            expect(_getValue(batcher)).toEqual([undefined, undefined, undefined, 15, undefined]);
            let r1 = _arrRemove(batcher, -2);
            expect(_getValue(r1)).toEqual([undefined, undefined, undefined, undefined]);
            expect(_getValue(r1)).not.toBe(arr);
        })       
        
        it('should not remove the index of array referenced (with void spaces), with an invalid index', () => {
            let arr = [1, 4, 7, 9, 15];
            let batcher = createArrayBatcher(arr);
            let r1 = _arrRemove(batcher, 5);
            expect(_getValue(r1)).toEqual([1, 4, 7, 9, 15]);
            expect(_getValue(r1)).toBe(arr);
        })

        it('should not remove the index of array referenced (with void spaces), with an invalid negative index', () => {
            let arr = [1, 4, 7, 9, 15];
            let batcher = createArrayBatcher(arr);
            let r1 = _arrRemove(batcher, -6);
            expect(_getValue(r1)).toEqual([1, 4, 7, 9, 15]);
            expect(_getValue(r1)).toBe(arr);
        })

        it('should remove the index of array referenced, with a negative index', () => {
            let arr = [1, 4, 7, 9, 15];
            let batcher = createArrayBatcher(arr);
            let r1 = _arrRemove(batcher,-2);
            expect(_getValue(r1)).toEqual([1, 4, 7, 15]);
            expect(_getValue(r1)).not.toBe(arr);
        })

        it('should not change the array', () => {
            let arr = [1, 4, 7, 9, 15];
            let batcher = createArrayBatcher(arr);
            let r1 = _arrRemove(batcher, 7);
            expect(_getValue(r1)).toEqual([1, 4, 7, 9, 15]);
            expect(_getValue(r1)).toBe(arr);
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
            expect(_getValue(r1)).toBe(emptyArr)
        })    
    })
    describe('in a non-empty array', () =>{
        it('should remove the index of array referenced', () => {
            let arr = [1, 4, 7, 9, 15];
            let batcher = createArrayBatcher(arr, true);
            let r1 = _arrRemove(batcher, 2);
            expect(hasChanged(r1)).toBe(true);
            expect(_getValue(r1)).toEqual([1, 4, 9, 15]);
            expect(_getValue(r1)).toBe(arr);
        })

        it('should remove the index of array referenced (with void spaces)', () => {
            let arr = [];
            arr[3] = 15;
            let batcher = createArrayBatcher(arr, true);
            expect(_getValue(batcher)).toEqual([undefined, undefined, undefined, 15]);
            let r1 = _arrRemove(batcher, 1);
            expect(hasChanged(r1)).toBe(true);
            expect(_getValue(r1)).toEqual([undefined, undefined, 15]);
            expect(_getValue(r1)).toBe(arr);
        })

        it('should remove the index of array referenced (with void spaces), with a negative index', () => {
            let arr = [];
            arr[3] = 15;
            arr.length = 5;
            let batcher = createArrayBatcher(arr, true);
            expect(_getValue(batcher)).toEqual([undefined, undefined, undefined, 15, undefined]);
            let r1 = _arrRemove(batcher, -2);
            expect(hasChanged(r1)).toBe(true);                
            expect(_getValue(r1)).toEqual([undefined, undefined, undefined, undefined]);
            expect(_getValue(r1)).toBe(arr);
        })       
        
        it('should not remove the index of array referenced (with void spaces), with an invalid index', () => {
            let arr = [1, 4, 7, 9, 15];
            let batcher = createArrayBatcher(arr, true);
            let r1 = _arrRemove(batcher, 5);
            expect(_getValue(r1)).toEqual([1, 4, 7, 9, 15]);
            expect(hasChanged(r1)).toBe(false);                
            expect(_getValue(r1)).toBe(arr);
        })

        it('should not remove the index of array referenced (with void spaces), with an invalid negative index', () => {
            let arr = [1, 4, 7, 9, 15];
            let batcher = createArrayBatcher(arr, true);
            let r1 = _arrRemove(batcher, -6);
            expect(_getValue(r1)).toEqual([1, 4, 7, 9, 15]);
            expect(_getValue(r1)).toBe(arr);
            expect(hasChanged(r1)).toBe(false);                
        })

        it('should remove the index of array referenced, with a negative index', () => {
            let arr = [1, 4, 7, 9, 15];
            let batcher = createArrayBatcher(arr, true);
            let r1 = _arrRemove(batcher,-2);
            expect(_getValue(r1)).toEqual([1, 4, 7, 15]);
            expect(_getValue(r1)).toBe(arr);
            expect(hasChanged(r1)).toBe(true);                
        })

        it('should not change the array', () => {
            let arr = [1, 4, 7, 9, 15];
            let batcher = createArrayBatcher(arr, true);
            let r1 = _arrRemove(batcher, 7);
            expect(_getValue(r1)).toEqual([1, 4, 7, 9, 15]);
            expect(_getValue(r1)).toBe(arr);
            expect(hasChanged(r1)).toBe(false);                
        })    
    })
   
})