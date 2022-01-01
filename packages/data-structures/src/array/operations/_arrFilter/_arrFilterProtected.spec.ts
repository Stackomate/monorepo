import { createArrayBatcher } from "../..";
import { getValue } from "../../../utils";
import { arrFilterForLocked } from "./filter-for-locked";
import { arrFilterForUnlocked } from "./filter-for-unlocked";

describe('filterForUnlocked', () => {
    it('should filter the items', () => {
        let arr = [1, 2, 5, 3, 84, 122, 126];
        let batcher = createArrayBatcher(arr, true);
        arrFilterForUnlocked(batcher, (i) => i % 2 === 0)
        expect(getValue(batcher)).toBe(arr);
        expect(arr).toEqual([2, 84, 122, 126])
        expect(arr.length).toEqual(4)
    })

    it('should filter the items', () => {
        let arr = [-12, 2, 5, 3, 84, 122, 126];
        let batcher = createArrayBatcher(arr, true);
        arrFilterForUnlocked(batcher, (i) => i % 2 === 0)
        expect(getValue(batcher)).toBe(arr);
        expect(arr).toEqual([-12, 2, 84, 122, 126])
        expect(arr.length).toEqual(5);
    })
    
    it('should filter the items', () => {
        let arr = [-12, 2, 5, 3, 84, 122, 1265];
        let batcher = createArrayBatcher(arr, true);
        arrFilterForUnlocked(batcher, (i) => i % 2 === 0)
        expect(getValue(batcher)).toBe(arr);
        expect(arr).toEqual([-12, 2, 84, 122])
        expect(arr.length).toEqual(4);
    })
})

describe('filterForLocked', () => {
    it('should filter the items', () => {
        let arr = [1, 2, 5, 3, 84, 122, 126];
        let batcher = createArrayBatcher(arr);
        arrFilterForLocked(batcher, (i) => i % 2 === 0)
        let s1 = getValue(batcher);
        expect(s1).not.toBe(arr);
        expect(s1).toEqual([2, 84, 122, 126]);
        expect(arr).toEqual([1, 2, 5, 3, 84, 122, 126]);
        expect(arr.length).toEqual(7)
        expect(s1.length).toEqual(4)
    })

    it('should filter the items', () => {
        let arr = [-12, 2, 5, 3, 84, 122, 126];
        let batcher = createArrayBatcher(arr);
        arrFilterForLocked(batcher, (i) => i % 2 === 0)
        let s1 = getValue(batcher);
        expect(s1).not.toBe(arr);
        expect(s1).toEqual([-12, 2, 84, 122, 126]);
        expect(s1.length).toEqual(5);
        expect(arr).toEqual([-12, 2, 5, 3, 84, 122, 126]);
        expect(arr.length).toEqual(7);
    })      
    
    it('should filter the items', () => {
        let arr = [-12, 2, 5, 3, 84, 122, 1265];
        let batcher = createArrayBatcher(arr);
        arrFilterForLocked(batcher, (i) => i % 2 === 0)
        let s1 = getValue(batcher);
        expect(s1).not.toBe(arr);
        expect(s1).toEqual([-12, 2, 84, 122])
        expect(s1.length).toEqual(4);
        expect(arr).toEqual([-12, 2, 5, 3, 84, 122, 1265]);
        expect(arr.length).toEqual(7)                 
    })                  
})