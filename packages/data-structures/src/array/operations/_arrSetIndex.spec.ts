import { _getValue } from "../../utils";
import { createArrayBatcher } from "../batcher";
import { _arrSetIndex } from "./_arrSetIndex";

describe('setIndex', () => {
    it('should set undefined for empty index greater than array length', () => {
        let arr: Array<number | undefined> = [];
        arr.length = 2;
        let batcher = createArrayBatcher(arr);
        expect(batcher.currentValue).toEqual([undefined, undefined])
        expect(batcher.currentValue.length).toBe(2);
        let b2 = _arrSetIndex(batcher, 4, undefined);
        expect(_getValue(b2)).not.toBe(arr);
        expect(batcher.currentValue.length).toBe(5);
    })
})