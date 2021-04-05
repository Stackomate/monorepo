import { _arrFilter, useArrayBatcher } from "../src/array"
import { $arrFilter, arrFilter, arrMap, arrPush, arrSet, arrSetLength, arrSpread } from "../src/array/pipeables";
import { Batcher, value } from "../src/batcher";
import { batch } from "../src/batch-fn";

/* 4 ways of calling operations:
- $arrPush (b) (1, 'abc')    // (Preferred) for single operations
- b.batch(
    arrPush(1, 'abc')       // (Preferred) for many operations
)
- _arrPush (b, 1, 'abc');    // For single operations
- batch(b,
    arrPush(1, 'abc')       // For many operations
)
*/
/* Notes:
- mapping to different types may require a new variable assignment (because of Typescript's behavior)

- You can use tap inside the batch call to make side-effects but return last result.
- You can use custom functions inside the batch call to access variables on the fly
*/

describe('documentation', () => {
    describe('example 1', () => {
        it ('should not clone array', () => {
            let arr = [10, 20, 30, 40];
            let b = useArrayBatcher(arr);

            b.batch(
                arrFilter (i => i < 100),
                arrFilter (i => i > -10),
                arrMap (i => i),
                arrSet (1, 20)
            )

            let emptyArray = useArrayBatcher<number>([]);
            
            b.batch(
                arrSpread (emptyArray),
                arrSetLength (4)
            )

            expect(value(b)).toBe(arr);
        })

        it('should clone array just once in the whole process', () => {
            let arr = [10, 20, 30, 40];
            let b = useArrayBatcher(arr);

            b.batch(
                arrFilter(i => i < 40)        // [10, 20, 30]
            )

            let snapshot1 = value(b);

            b.batch(
                arrFilter(i => i > 10),         // [20, 30]
                arrMap(i => i + 1),             // [21, 31]
                arrSet(2, 89),                  // [21, 31, 89]
            )
                
            let anotherArray = useArrayBatcher<number>([99, 101]);

            b.batch(
                arrSpread(anotherArray),        // [21, 31, 89, 99, 101]
                arrPush(125)                    // [21, 31, 89, 99, 101, 125]
            )

            expect(value(b)).not.toBe(arr);                         // Different object references
            expect(value(b)).toEqual([21, 31, 89, 99, 101, 125]);   // Batcher created new object for result
            expect(arr).toEqual([10, 20, 30, 40])                   // Initial Array did not change
            
            /* Result array reference is same from snapshot1.
            Cloning just happened after the first change! */
            expect(snapshot1).toBe(value(b));
            expect(snapshot1).not.toBe(arr);
        })
    })
})
