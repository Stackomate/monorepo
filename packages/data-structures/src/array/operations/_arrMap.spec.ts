import { _getValue } from "../../utils";
import { createArrayBatcher } from "../batcher";
import { _arrMap } from "./_arrMap";

describe('map', () => {
    it('should map the items', () => {
        let arr = [1, 2, 5, 3, 84, 122, 126];
        let batcher = createArrayBatcher(arr);
        let batcher2 = _arrMap(batcher, (i) => i % 2 === 0)
        expect(_getValue(batcher2)).not.toBe(arr);
        expect(batcher).toBe(batcher2);
        expect(_getValue(batcher2)).toEqual([false, true, false, false, true, true, true]);
        expect(arr.length).toEqual(7);
        expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);

        let batcher3 = _arrMap(batcher2, (i) => i ? 1 : 0)
        expect(_getValue(batcher3)).toBe(_getValue(batcher2));
        expect(_getValue(batcher2)).not.toBe(arr);
        expect(_getValue(batcher3)).not.toBe(arr);
        expect(_getValue(batcher2)).toEqual([0, 1, 0, 0, 1, 1, 1]);
        expect(_getValue(batcher3)).toEqual([0, 1, 0, 0, 1, 1, 1]);            
        expect(arr.length).toEqual(7);
        expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);    
    })

    it('should not change the array', () => {
        let arr = [1, 2, 5, 3, 84, 122, 126];
        let batcher = createArrayBatcher(arr);
        let batcher2 = _arrMap(batcher, i => i)
        expect(_getValue(batcher2)).toBe(arr);
        expect(batcher).toBe(batcher2);
        expect(_getValue(batcher2)).toEqual(arr);
        expect(arr.length).toEqual(7);
        expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);

        let batcher3 = _arrMap(batcher, i => i)
        expect(_getValue(batcher3)).toBe(arr);
        expect(batcher).toBe(batcher2);
        expect(batcher3).toBe(batcher2);
        expect(_getValue(batcher3)).toEqual(arr);
        expect(arr.length).toEqual(7);
        expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]); 
        expect(_getValue(batcher3)).toEqual(arr);
    })
})