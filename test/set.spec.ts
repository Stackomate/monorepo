import { prepareBatcher } from "../src/batcher"
import { add, filter, remove } from "../src/set"

describe('Set exports', () => {
    describe('add', () => {
        it('should work as internal add', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let batcher = prepareBatcher(mySet)
            add(batcher, 10);
            expect(batcher.currentValue).not.toBe(mySet);
            expect(batcher.currentValue).toEqual(new Set([1, 2, 3, 4, 10]));
        })

        it ('should keep reference', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let batcher = prepareBatcher(mySet)
            add(batcher, 1);
            expect(batcher.currentValue).toBe(mySet);
            expect(batcher.currentValue).toEqual(new Set([1, 2, 3, 4]));            
        })
    })

    describe('remove', () => {
        it('should work as internal remove', () => {
            let mySet = new Set([1, 2, 3, 4, 10]);
            let batcher = prepareBatcher(mySet)
            remove(batcher, 10);
            expect(batcher.currentValue).not.toBe(mySet);
            expect(batcher.currentValue).toEqual(new Set([1, 2, 3, 4]));
        })

        it ('should keep reference', () => {
            let mySet = new Set([1, 2, 3, 4]);
            let batcher = prepareBatcher(mySet)
            remove(batcher, 10);
            expect(batcher.currentValue).toBe(mySet);
            expect(batcher.currentValue).toEqual(new Set([1, 2, 3, 4]));            
        })
    })  
    
    describe('filter', () => {
        it('should work as internal filter', () => {
            let mySet = new Set([1, 2, 3, 4, 10]);
            let batcher = prepareBatcher(mySet)
            filter(batcher, (i) => i % 2 === 0);
            expect(batcher.currentValue).not.toBe(mySet);
            expect(batcher.currentValue).toEqual(new Set([2, 4, 10]));
        })

        it ('should keep reference', () => {
            let mySet = new Set([1, 2, 3, 4, 10, 55]);
            let batcher = prepareBatcher(mySet)
            filter(batcher, (i) => i < 100);
            expect(batcher.currentValue).toBe(mySet);
            expect(batcher.currentValue).toEqual(new Set([1, 2, 3, 4, 10, 55]));            
        })
    })    

})