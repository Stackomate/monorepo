import { getValue } from "../../utils";
import { createArrayBatcher } from "../batcher";
import { _arrMap } from "./_arrMap";

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