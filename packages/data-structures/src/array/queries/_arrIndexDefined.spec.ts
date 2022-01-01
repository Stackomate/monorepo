import { createArrayBatcher } from "../batcher";
import { _arrIndexDefined } from "./_arrIndexDefined";

describe('index defined', () => {
    describe('should verify a positive index', () => {
        it('should verify a index not void', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = createArrayBatcher(arr);
            let batcher2 = _arrIndexDefined(batcher, 3);
            expect(batcher2).toEqual(true);
        })
        it('should verify a index is void in a index out of range', () => {
            let arr = [1, 2];
            let batcher = createArrayBatcher(arr);
            let batcher2 = _arrIndexDefined(batcher, 3);
            expect(batcher2).toEqual(false);
        })
        it('should verify a index is void in a void array', () => {
            let emptyArr: number[] = [];
            let batcher = createArrayBatcher(emptyArr);
            let batcher2 = _arrIndexDefined(batcher, 3);
            expect(batcher2).toEqual(false);
        })
    })
    describe('should verify a negative index', () => {
        it('should verify a index not void', () => {
            let arr = [1, 2, 5, 3, 84, 122, 126];
            let batcher = createArrayBatcher(arr);
            let batcher2 = _arrIndexDefined(batcher, -3);
            expect(batcher2).toEqual(true);
        })
        it('should verify a negative index is void in a void array', () => {
            let emptyArr: number[] = [];
            let batcher = createArrayBatcher(emptyArr);
            let batcher2 = _arrIndexDefined(batcher, -3);
            expect(batcher2).toEqual(false);
        })
    })
})