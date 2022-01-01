import { createArrayBatcher } from "../batcher";
import { _arrAt } from "./_arrAt";

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