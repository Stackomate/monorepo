import { _ckmFromArray } from "../operations/_ckmFromArray";
import { _ckmTreeArray } from "./_ckmTreeArray";
import { _ckmHas } from "./_ckmHas";


describe('_ckmHas', () => {
    it ('should not contain undefined index', () => {
        let ckm = _ckmFromArray<string, number>([]);
        expect(_ckmTreeArray(ckm)).toEqual([]);

        expect(_ckmHas(ckm, [])).toEqual(false);
        expect(_ckmTreeArray(ckm)).toEqual([]);

        expect(_ckmHas(ckm, [''])).toEqual(false);
        expect(_ckmTreeArray(ckm)).toEqual([]);   
        
        expect(_ckmHas(ckm, [undefined])).toEqual(false);
        expect(_ckmTreeArray(ckm)).toEqual([]);              

        expect(_ckmHas(ckm, ['a'])).toEqual(false);
        expect(_ckmTreeArray(ckm)).toEqual([]);

        expect(_ckmHas(ckm, ['a', 'b'])).toEqual(false);
        expect(_ckmTreeArray(ckm)).toEqual([]);        

        expect(_ckmHas(ckm, ['a', 'b', 'c'])).toEqual(false);
        expect(_ckmTreeArray(ckm)).toEqual([]);        

        expect(_ckmHas(ckm, ['a', 'b', 'c', 'd'])).toEqual(false);
        expect(_ckmTreeArray(ckm)).toEqual([]);            
    })

    it ('should return false for undefined nested index', () => {
        let ckm = _ckmFromArray<string, number | undefined>([
            [['a', 'y'], undefined]
        ]);
        expect(_ckmTreeArray(ckm)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: undefined, children: []}
            ]
        }]);
        
        expect(_ckmHas(ckm, ['a'])).toEqual(false);
        expect(_ckmTreeArray(ckm)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: undefined, children: []}
            ]
        }]);

        expect(_ckmHas(ckm, ['a', 'b'])).toEqual(false);
        expect(_ckmTreeArray(ckm)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: undefined, children: []}
            ]
        }]);      

        expect(_ckmHas(ckm, ['a', 'y'])).toEqual(true);
        expect(_ckmTreeArray(ckm)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: undefined, children: []}
            ]
        }]);

        expect(_ckmHas(ckm, ['b', 'y'])).toEqual(false);
        expect(_ckmTreeArray(ckm)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: undefined, children: []}
            ]
        }]);      
        
        expect(_ckmHas(ckm, ['x'])).toEqual(false);
        expect(_ckmTreeArray(ckm)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: undefined, children: []}
            ]
        }]);        

        expect(_ckmHas(ckm, [''])).toEqual(false);
        expect(_ckmTreeArray(ckm)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: undefined, children: []}
            ]
        }]);            
        
        expect(_ckmHas(ckm, [])).toEqual(false);
        expect(_ckmTreeArray(ckm)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: undefined, children: []}
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

        expect(_ckmHas(ckm, [])).toEqual(false);
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

        expect(_ckmHas(ckm, [''])).toEqual(false);
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

        expect(_ckmHas(ckm, ['a'])).toEqual(true);
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

        expect(_ckmHas(ckm, ['a', 'b'])).toEqual(false);
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

        expect(_ckmHas(ckm, ['a', 'b', 'c'])).toEqual(true);
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

        expect(_ckmHas(ckm, ['x'])).toEqual(false);
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
        
        expect(_ckmHas(ckm, ['x', 'y'])).toEqual(true);
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