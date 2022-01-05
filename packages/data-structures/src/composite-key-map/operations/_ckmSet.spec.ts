import { _ckmTreeArray } from "../query/_ckmTreeArray";
import { _ckmFromArray } from "./_ckmFromArray"
import { _ckmSet } from "./_ckmSet";

describe('_ckmSet', () => {
    it ('should set on empty composite index', () => {
        let ckm = _ckmFromArray<string, number>([]);
        expect(_ckmTreeArray(ckm)).toEqual([]);
        _ckmSet(ckm, ['a'], 12);
        expect(_ckmTreeArray(ckm)).toEqual([{key: 'a', isKey: true, value: 12, children: []}]);
        _ckmSet(ckm, ['a', 'b'], 5);
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'a', isKey: true, value: 12, children: [
                {key: 'b', isKey: true, value: 5, children: []
            }]
        }]);
        _ckmSet(ckm, ['x'], 1);
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'a', isKey: true, value: 12, children: [
                {key: 'b', isKey: true, value: 5, children: []}
            ]},
            {key: 'x', isKey: true, value: 1, children: []}
        ]);       
        _ckmSet(ckm, ['x', 'y', 'z'], 100);
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'a', isKey: true, value: 12, children: [
                {key: 'b', isKey: true, value: 5, children: []}
            ]},
            {key: 'x', isKey: true, value: 1, children: [
                {key: 'y', isKey: false, value: undefined, children: [
                    {key: 'z', isKey: true, value: 100, children: []}
                ]}
            ]}
        ]);     
        _ckmSet(ckm, ['a', 'b', 'c', 'd', 'e'], undefined);
        expect(_ckmTreeArray(ckm)).toEqual([
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