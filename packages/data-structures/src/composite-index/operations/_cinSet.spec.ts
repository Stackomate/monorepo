import { _cinTreeArray } from "../query/_cinTreeArray";
import { _cinFromArray } from "./_cinFromArray"
import { _cinSet } from "./_cinSet";

describe('_cinSet', () => {
    it ('should set on empty composite index', () => {
        let cin = _cinFromArray<string, number>([]);
        expect(_cinTreeArray(cin)).toEqual([]);
        _cinSet(cin, ['a'], 12);
        expect(_cinTreeArray(cin)).toEqual([{key: 'a', isKey: true, value: 12, children: []}]);
        _cinSet(cin, ['a', 'b'], 5);
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'a', isKey: true, value: 12, children: [
                {key: 'b', isKey: true, value: 5, children: []
            }]
        }]);
        _cinSet(cin, ['x'], 1);
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'a', isKey: true, value: 12, children: [
                {key: 'b', isKey: true, value: 5, children: []}
            ]},
            {key: 'x', isKey: true, value: 1, children: []}
        ]);       
        _cinSet(cin, ['x', 'y', 'z'], 100);
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'a', isKey: true, value: 12, children: [
                {key: 'b', isKey: true, value: 5, children: []}
            ]},
            {key: 'x', isKey: true, value: 1, children: [
                {key: 'y', isKey: false, value: undefined, children: [
                    {key: 'z', isKey: true, value: 100, children: []}
                ]}
            ]}
        ]);     
        _cinSet(cin, ['a', 'b', 'c', 'd', 'e'], undefined);
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'a', isKey: true, value: 12, children: [
                {key: 'b', isKey: true, value: 5, children: [
                    {key: 'c', isKey: false, value: undefined, children: [
                        {key: 'd', isKey: false, value: undefined, children: [
                            {key: 'e', isKey: true, value: undefined, children: []}
                        ]}
                    ]}
                ]}
            ]},
            {key: 'x', isKey: true, value: 1, children: [
                {key: 'y', isKey: false, value: undefined, children: [
                    {key: 'z', isKey: true, value: 100, children: []}
                ]}
            ]}
        ]);
    })
})