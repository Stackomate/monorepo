import { arrFilter, arrIndexAt, arrMap } from "..";
import { batch } from "../../precompile-output/batch-fn";
import { _getValue } from "../../utils";
import { createArrayBatcher } from "../batcher";
import { _arrDel } from "./_arrDel";

describe('del', () => {
    describe('non-empty array', () => {
        it('should use a positive index and has a undefined value on a deleted position', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = createArrayBatcher(arr);
            let batcher2 = _arrDel(batcher, 3);
            expect(_getValue(batcher2)).not.toBe(arr);
            expect(_getValue(batcher2)).toEqual([1, 2, 5, undefined, 84, 122, 126]);
        })

        it('should use a negative index and has a undefined value on a deleted position', () => {
            let arr = [1, 8, 11, 32, 4, 122, 149];
            let batcher = createArrayBatcher(arr);
            let batcher2 = _arrDel(batcher, -2);
            expect(_getValue(batcher2)).not.toBe(arr);
            expect(_getValue(batcher2)).toEqual([1, 8, 11, 32, 4, undefined, 149]);
        })
        
        it('should use a index out of range and has a toBe = true for batcher and array', () => {
            let arr = [1, 8, 11, 32, 4, 122, 149];
            let batcher = createArrayBatcher(arr);
            let batcher2 = _arrDel(batcher, 9);
            expect(_getValue(batcher2)).toBe(arr);
            expect(_getValue(batcher2)).toEqual([1, 8, 11, 32, 4, 122, 149]);
        })


    })
    describe('empty array', () => {
        it('should to be true with array and batcher', () => {
            let emptyArr : number[] = [];
            let batcher = createArrayBatcher(emptyArr);
            let batcher2 = _arrDel(batcher, 2);
            expect(_getValue(batcher2)).toBe(emptyArr);
        })
    })
})