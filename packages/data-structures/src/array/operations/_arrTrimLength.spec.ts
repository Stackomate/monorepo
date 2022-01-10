import { _getValue } from "../../utils";
import { createArrayBatcher } from "../batcher";
import { _arrSetLength } from "./_arrSetLength";
import { _arrTrimLength } from "./_arrTrimLength";

describe ('trimLength', () => {   
    describe('in a non-empty array', () => {
        it('should remove all undefined positions of array', () => {
            let arr = [1, 5, 8, 19, 22];
            arr.length = 10;
            let batcher = createArrayBatcher(arr);
            expect(_getValue(batcher)).toBe(arr);
            _arrTrimLength(batcher);
            expect(_getValue(batcher)).not.toBe(arr);
            expect(arr.length).toBe(10);
            expect(_getValue(batcher)).toEqual([1, 5, 8, 19, 22]);
            expect(_getValue(batcher).length).toBe(5);                
        })
    })
    describe('in a empty array', () => {
        it('should remove all undefined positions of array and return a empty array', () => {
            let emptyArr : number[] = [];
            emptyArr.length = 3;
            let batcher = createArrayBatcher(emptyArr);
            expect(_getValue(batcher)).toBe(emptyArr);
            expect(_getValue(batcher).length).toBe(3);
            _arrTrimLength(batcher);
            expect(_getValue(batcher)).not.toBe(emptyArr);
            expect(_getValue(batcher)).toEqual([]);
            expect(_getValue(batcher).length).toBe(0);
        })
    })
})

describe ('trimLength - mutable (after setLength)', () => {   
    describe('in a non-empty array', () => {
        it('should remove all undefined positions of array', () => {
            let arr = [1, 5, 8, 19, 22];
            let batcher = createArrayBatcher(arr);
            let batcher2 = _arrSetLength(batcher, 10);
            expect(_getValue(batcher2)).not.toBe(arr);
            batcher2 = _arrTrimLength(batcher);
            expect(_getValue(batcher2)).toEqual([1, 5, 8, 19, 22]);
        })
    })
    describe('in a empty array', () => {
        it('should remove all undefined positions of array and return a empty array', () => {
            let emptyArr : number[] = [];
            let batcher = createArrayBatcher(emptyArr);
            let batcher2 = _arrSetLength(batcher, 3);
            expect(_getValue(batcher2)).not.toBe(emptyArr);
            batcher2 = _arrTrimLength(batcher);
            expect(_getValue(batcher2)).toEqual([]);
        })
    })
})    