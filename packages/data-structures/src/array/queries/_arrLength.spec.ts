import { createArrayBatcher } from "../batcher";
import { _arrLength } from "./_arrLength";

describe('length', () => {
    describe('in empty array', () => {
        it ('should return 0', () => {
            let arr: number[] = [];
            let batcher = createArrayBatcher(arr);
            expect(_arrLength(batcher)).toBe(0);
        })
    })

    describe('in non-empty array', () => {
        describe('without voids', () => {
            it('should return 5', () => {
                let arr = ['a', 'b', 'c', 'd', 'e'];
                let batcher = createArrayBatcher(arr);
                expect(_arrLength(batcher)).toBe(5);
            })

            it('should return 3', () => {
                let arr = ['x', 'y', 'z'];
                let batcher = createArrayBatcher(arr);
                expect(_arrLength(batcher)).toBe(3);
            })
        })

        describe('with voids', () => {
            it('should return 30', () => {
                let arr: void[]= [];
                arr.length = 30;
                let batcher = createArrayBatcher(arr);
                expect(_arrLength(batcher)).toBe(30);
            })
        })
    })
})