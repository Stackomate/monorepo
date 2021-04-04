import { useArrayBatcher } from "../src/array"
import { arr_filter, arr_map, arr_push, arr_set, arr_setLength, arr_spread } from "../src/array/pipeables";
import { value } from "../src/batcher";

describe('documentation', () => {
    describe('example 1', () => {
        it ('should not clone array', () => {
            let arr = [10, 20, 30, 40];
            let b = useArrayBatcher(arr);

            arr_filter (b) (i => i < 100);
            arr_filter (b) (i => i > -10);
            arr_map (b) (i => i);
            arr_set (b) (1, 20);

            let emptyArray = useArrayBatcher<number>([]);
            
            arr_spread (b) (emptyArray);
            arr_setLength (b) (4);

            expect(value(b)).toBe(arr);
        })

        it('should clone array just once in the whole process', () => {
            let arr = [10, 20, 30, 40];
            let b = useArrayBatcher(arr);
            arr_filter (b) (i => i < 40);  // [10, 20, 30]
            
            let snapshot1 = value(b);

            arr_filter (b) (i => i > 10);  // [20, 30]
            arr_map (b) (i => i + 1);      // [21, 31]
            arr_set (b) (2, 89);      // [21, 31, 89]

            let anotherArray = useArrayBatcher<number>([99, 101]);
            arr_spread (b) (anotherArray);   // [21, 31, 89, 99, 101]
            arr_push (b) (125);                // [21, 31, 89, 99, 101, 125]

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
