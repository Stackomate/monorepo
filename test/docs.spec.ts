import { useArrayBatcher } from "../src/array"
import { arr_filter, arr_map, arr_push, arr_set, arr_setLength, arr_spread } from "../src/array/pipeables";
import { value } from "../src/batcher";
import { batch } from "../src/batch-fn";

/* 3 ways of calling operations:
- $arrPush(b, 1, 'abc');    // For single operations
- batch(b, 
    arrPush(1, 'abc')       // For many operations
)
- b.batch(
    arrPush(1, 'abc')       // (Preferred) for many operations
)
*/

describe('documentation', () => {
    describe('example 1', () => {
        it ('should not clone array', () => {
            let arr = [10, 20, 30, 40];
            let b = useArrayBatcher(arr);

            b.batch(
                arr_filter (i => i < 100),
                arr_filter (i => i > -10),
                arr_map (i => i),
                arr_set (1, 20)
            )

            let emptyArray = useArrayBatcher<number>([]);
            
            b.batch(
                arr_spread (emptyArray),
                arr_setLength (4)
            )

            expect(value(b)).toBe(arr);
        })

        it('should clone array just once in the whole process', () => {
            let arr = [10, 20, 30, 40];
            let b = useArrayBatcher(arr);
            
            b.batch(
                arr_filter (i => i < 40)  // [10, 20, 30]
            )

            let snapshot1 = value(b);

            batch(b,
                arr_filter(i => i > 10),  // [20, 30]
                arr_map(i => i + 1),      // [21, 31]
                arr_set(2, 89),            // [21, 31, 89]
            )     

            let anotherArray = useArrayBatcher<number>([99, 101]);
            
            batch(b,
                arr_spread(anotherArray),   // [21, 31, 89, 99, 101]
                arr_push (125)                 // [21, 31, 89, 99, 101, 125]
            )               

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
