import { _ckmFromArray } from "../operations/_ckmFromArray";
import { _ckmTreeArray } from "./_ckmTreeArray";
import { _ckmGet } from "./_ckmGet";


describe('_ckmGet', () => {
    it ('should return undefined for undefined index', () => {
        let ckm = _ckmFromArray<string, number>([]);
        expect(_ckmTreeArray(ckm)).toEqual([]);

        expect(_ckmGet(ckm, [])).toEqual(undefined);
        expect(_ckmTreeArray(ckm)).toEqual([]);

        expect(_ckmGet(ckm, [''])).toEqual(undefined);
        expect(_ckmTreeArray(ckm)).toEqual([]);        

        expect(_ckmGet(ckm, ['a'])).toEqual(undefined);
        expect(_ckmTreeArray(ckm)).toEqual([]);

        expect(_ckmGet(ckm, ['a', 'b'])).toEqual(undefined);
        expect(_ckmTreeArray(ckm)).toEqual([]);        

        expect(_ckmGet(ckm, ['a', 'b', 'c', 'd'])).toEqual(undefined);
        expect(_ckmTreeArray(ckm)).toEqual([]);            
    })

    it ('should return undefined for undefined nested index', () => {
        let ckm = _ckmFromArray<string, number>([
            [['a', 'y'], 10]
        ]);
        expect(_ckmTreeArray(ckm)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]
        }]);
        
        expect(_ckmGet(ckm, ['a'])).toEqual(undefined);
        expect(_ckmTreeArray(ckm)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]
        }]);

        expect(_ckmGet(ckm, ['a', 'b'])).toEqual(undefined);
        expect(_ckmTreeArray(ckm)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]
        }]);      

        expect(_ckmGet(ckm, ['b', 'y'])).toEqual(undefined);
        expect(_ckmTreeArray(ckm)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]
        }]);      
        
        expect(_ckmGet(ckm, ['x'])).toEqual(undefined);
        expect(_ckmTreeArray(ckm)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]
        }]);        

        expect(_ckmGet(ckm, [''])).toEqual(undefined);
        expect(_ckmTreeArray(ckm)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]
        }]);            
        
        expect(_ckmGet(ckm, [])).toEqual(undefined);
        expect(_ckmTreeArray(ckm)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]
        }]);             

    })    
    
    it ('should return values for defined keys', () => {
        let ckm = _ckmFromArray<string, number>([
            [['a'], 15],
            [['a', 'b', 'c'], 11],
            [['x', 'y'], 10]
        ]);
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'a', isKey: true, value: 15, children: [
                {key: 'b', isKey: false, value: undefined, children: [
                    {key: 'c', isKey: true, value: 11, children: []}
                ]}
            ]},
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);

        expect(_ckmGet(ckm, [])).toEqual(undefined);
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'a', isKey: true, value: 15, children: [
                {key: 'b', isKey: false, value: undefined, children: [
                    {key: 'c', isKey: true, value: 11, children: []}
                ]}
            ]},
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);

        expect(_ckmGet(ckm, [''])).toEqual(undefined);
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'a', isKey: true, value: 15, children: [
                {key: 'b', isKey: false, value: undefined, children: [
                    {key: 'c', isKey: true, value: 11, children: []}
                ]}
            ]},
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);

        expect(_ckmGet(ckm, ['a'])).toEqual(15);
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'a', isKey: true, value: 15, children: [
                {key: 'b', isKey: false, value: undefined, children: [
                    {key: 'c', isKey: true, value: 11, children: []}
                ]}
            ]},
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);

        expect(_ckmGet(ckm, ['a', 'b'])).toEqual(undefined);
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'a', isKey: true, value: 15, children: [
                {key: 'b', isKey: false, value: undefined, children: [
                    {key: 'c', isKey: true, value: 11, children: []}
                ]}
            ]},
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);   

        expect(_ckmGet(ckm, ['a', 'b', 'c'])).toEqual(11);
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'a', isKey: true, value: 15, children: [
                {key: 'b', isKey: false, value: undefined, children: [
                    {key: 'c', isKey: true, value: 11, children: []}
                ]}
            ]},
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);          

        expect(_ckmGet(ckm, ['x'])).toEqual(undefined);
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'a', isKey: true, value: 15, children: [
                {key: 'b', isKey: false, value: undefined, children: [
                    {key: 'c', isKey: true, value: 11, children: []}
                ]}
            ]},
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);      
        
        expect(_ckmGet(ckm, ['x', 'y'])).toEqual(10);
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'a', isKey: true, value: 15, children: [
                {key: 'b', isKey: false, value: undefined, children: [
                    {key: 'c', isKey: true, value: 11, children: []}
                ]}
            ]},
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);           
    })    

})