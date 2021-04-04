import { arrFilter, arrMap, arrPush, arrSetIndex, arrSetLength, arrSpread, useArrayBatcher } from "../src/array"
import { value } from "../src/batcher";

describe('documentation', () => {
    describe('example 1', () => {
        it ('should not clone array', () => {
            let arr = [10, 20, 30, 40];
            let b = useArrayBatcher(arr);
            arrFilter(b, i => i < 100);
            arrFilter(b, i => i > -10);
            arrMap(b, i => i);
            arrSetIndex(b, 1, 20);

            let emptyArray = useArrayBatcher<number>([]);
            arrSpread(b, [emptyArray]);
            arrSetLength(b, 4);

            expect(value(b)).toBe(arr);
        })

        it('should clone array just once in the whole process', () => {
            let arr = [10, 20, 30, 40];
            let b = useArrayBatcher(arr);
            arrFilter(b, i => i < 40);  // [10, 20, 30]
            
            let snapshot1 = value(b);

            arrFilter(b, i => i > 10);  // [20, 30]
            arrMap(b, i => i + 1);      // [21, 31]
            arrSetIndex(b, 2, 89);      // [21, 31, 89]

            let anotherArray = useArrayBatcher<number>([99, 101]);
            arrSpread(b, [anotherArray]);   // [21, 31, 89, 99, 101]
            arrPush(b, 125);                // [21, 31, 89, 99, 101, 125]

            expect(value(b)).not.toBe(arr);                     // Different object references
            expect(value(b)).toEqual([21, 31, 89, 99, 101, 125]);   // Batcher created new object for result
            expect(arr).toEqual([10, 20, 30, 40])               // Initial Array did not change
            
            /* Result array reference is same from snapshot1.
            Cloning just happened after the first change! */
            expect(snapshot1).toBe(value(b));
            expect(snapshot1).not.toBe(arr);
        })
    })
})
