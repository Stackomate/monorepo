import { _cinFromArray } from "../operations/_cinFromArray";
import { _cinTreeArray } from "../query/_cinTreeArray";
import { _cinHas } from "./_cinHas";


describe('_cinHas', () => {
    it ('should not contain undefined index', () => {
        let cin = _cinFromArray<string, number>([]);
        expect(_cinTreeArray(cin)).toEqual([]);

        expect(_cinHas(cin, [])).toEqual(false);
        expect(_cinTreeArray(cin)).toEqual([]);

        expect(_cinHas(cin, [''])).toEqual(false);
        expect(_cinTreeArray(cin)).toEqual([]);   
        
        expect(_cinHas(cin, [undefined])).toEqual(false);
        expect(_cinTreeArray(cin)).toEqual([]);              

        expect(_cinHas(cin, ['a'])).toEqual(false);
        expect(_cinTreeArray(cin)).toEqual([]);

        expect(_cinHas(cin, ['a', 'b'])).toEqual(false);
        expect(_cinTreeArray(cin)).toEqual([]);        

        expect(_cinHas(cin, ['a', 'b', 'c'])).toEqual(false);
        expect(_cinTreeArray(cin)).toEqual([]);        

        expect(_cinHas(cin, ['a', 'b', 'c', 'd'])).toEqual(false);
        expect(_cinTreeArray(cin)).toEqual([]);            
    })

    it ('should return false for undefined nested index', () => {
        let cin = _cinFromArray<string, number | undefined>([
            [['a', 'y'], undefined]
        ]);
        expect(_cinTreeArray(cin)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: undefined, children: []}
            ]
        }]);
        
        expect(_cinHas(cin, ['a'])).toEqual(false);
        expect(_cinTreeArray(cin)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: undefined, children: []}
            ]
        }]);

        expect(_cinHas(cin, ['a', 'b'])).toEqual(false);
        expect(_cinTreeArray(cin)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: undefined, children: []}
            ]
        }]);      

        expect(_cinHas(cin, ['a', 'y'])).toEqual(true);
        expect(_cinTreeArray(cin)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: undefined, children: []}
            ]
        }]);

        expect(_cinHas(cin, ['b', 'y'])).toEqual(false);
        expect(_cinTreeArray(cin)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: undefined, children: []}
            ]
        }]);      
        
        expect(_cinHas(cin, ['x'])).toEqual(false);
        expect(_cinTreeArray(cin)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: undefined, children: []}
            ]
        }]);        

        expect(_cinHas(cin, [''])).toEqual(false);
        expect(_cinTreeArray(cin)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: undefined, children: []}
            ]
        }]);            
        
        expect(_cinHas(cin, [])).toEqual(false);
        expect(_cinTreeArray(cin)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: undefined, children: []}
            ]
        }]);             

    })    
    
    it ('should return values for defined keys', () => {
        let cin = _cinFromArray<string, number>([
            [['a'], 15],
            [['a', 'b', 'c'], 11],
            [['x', 'y'], 10]
        ]);
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'a', isKey: true, value: 15, children: [
                {key: 'b', isKey: false, value: undefined, children: [
                    {key: 'c', isKey: true, value: 11, children: []}
                ]}
            ]},
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);

        expect(_cinHas(cin, [])).toEqual(false);
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'a', isKey: true, value: 15, children: [
                {key: 'b', isKey: false, value: undefined, children: [
                    {key: 'c', isKey: true, value: 11, children: []}
                ]}
            ]},
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);

        expect(_cinHas(cin, [''])).toEqual(false);
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'a', isKey: true, value: 15, children: [
                {key: 'b', isKey: false, value: undefined, children: [
                    {key: 'c', isKey: true, value: 11, children: []}
                ]}
            ]},
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);

        expect(_cinHas(cin, ['a'])).toEqual(true);
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'a', isKey: true, value: 15, children: [
                {key: 'b', isKey: false, value: undefined, children: [
                    {key: 'c', isKey: true, value: 11, children: []}
                ]}
            ]},
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);

        expect(_cinHas(cin, ['a', 'b'])).toEqual(false);
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'a', isKey: true, value: 15, children: [
                {key: 'b', isKey: false, value: undefined, children: [
                    {key: 'c', isKey: true, value: 11, children: []}
                ]}
            ]},
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);   

        expect(_cinHas(cin, ['a', 'b', 'c'])).toEqual(true);
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'a', isKey: true, value: 15, children: [
                {key: 'b', isKey: false, value: undefined, children: [
                    {key: 'c', isKey: true, value: 11, children: []}
                ]}
            ]},
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);          

        expect(_cinHas(cin, ['x'])).toEqual(false);
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'a', isKey: true, value: 15, children: [
                {key: 'b', isKey: false, value: undefined, children: [
                    {key: 'c', isKey: true, value: 11, children: []}
                ]}
            ]},
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);      
        
        expect(_cinHas(cin, ['x', 'y'])).toEqual(true);
        expect(_cinTreeArray(cin)).toEqual([
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