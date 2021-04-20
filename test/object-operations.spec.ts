import { useObjectBatcher } from "../src/object/object-batcher"
import {_objGet, _objHas} from "../src/object/object-operations"

describe('obj exports', () => {
    describe('has', () => {
        it('should return all values and keys of myMap', () => {
            let myObj = {a: 1};
            let batcher = useObjectBatcher(myObj);

            expect(_objHas(batcher as any, '')).toEqual(false);
        })

    })

    describe('get', () => {
        it('should return all values and keys of myMap', () => {
            let myObj = {a: 1};
            let batcher = useObjectBatcher(myObj);

            expect(_objGet(batcher, 'a')).toEqual(1);
        })

    })
})