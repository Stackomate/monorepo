import { getValue } from "../../../utils";
import { createArrayBatcher } from "../../batcher";
import { _arrFilter } from "./_arrFilter";

describe('filter', () => {
    it('should filter the items', () => {
        let arr = [1, 2, 5, 3, 84, 122, 126];
        let batcher = createArrayBatcher(arr);
        _arrFilter(batcher, (i) => i % 2 === 0)
        let s1 = getValue(batcher);
        expect(s1).not.toBe(arr);
        expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);
        expect(arr.length).toEqual(7);
        expect(s1).toEqual([2, 84, 122, 126]);

        _arrFilter(batcher, (i) => i > 50);
        let s2 = getValue(batcher);
        expect(s2).toBe(s1);
        expect(s2).toEqual([84, 122, 126]);
        expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);
        expect(arr.length).toEqual(7);
        expect(s1).toEqual([84, 122, 126]);
        expect(s2.length).toEqual(3);
        expect(s1.length).toEqual(3);
    })

    it('should not change the array', () => {
        let arr = [1, 2, 5, 3, 84, 122, 126];
        let batcher = createArrayBatcher(arr);
        _arrFilter(batcher, (i) => i < 1000)
        let s1 = getValue(batcher);
        expect(s1).toBe(arr);
        expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);
        expect(arr.length).toEqual(7);
        expect(s1).toEqual([1, 2, 5, 3, 84, 122, 126]);
        expect(s1.length).toEqual(7);

        _arrFilter(batcher, (i) => i > -55);
        let s2 = getValue(batcher);
        expect(s2).toBe(s1);
        expect(s1).toBe(arr);
        expect(s2).toEqual([1, 2, 5, 3, 84, 122, 126]);
        expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);
        expect(s1).toEqual([1, 2, 5, 3, 84, 122, 126]);            
        expect(arr.length).toEqual(7);
        expect(s2.length).toEqual(7);
        expect(s1.length).toEqual(7);
    })
})