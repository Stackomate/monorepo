import { createArrayBatcher } from "../batcher";
import { _arrIndexAt } from "./_arrIndexAt";

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