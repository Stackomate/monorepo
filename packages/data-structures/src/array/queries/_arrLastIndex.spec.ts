import { createArrayBatcher } from "../batcher";
import { _arrLastIndex } from "./_arrLastIndex";

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