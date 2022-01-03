import { _cinFromArray } from "../operations/_cinFromArray";
import { _cinTreeArray } from "../query/_cinTreeArray";
import { _cinGet } from "./_cinGet";


describe('_cinGet', () => {
    it ('should return undefined for undefined index', () => {
        let cin = _cinFromArray<string, number>([]);
        expect(_cinTreeArray(cin)).toEqual([]);

        expect(_cinGet(cin, ['a'])).toEqual(undefined);
        expect(_cinTreeArray(cin)).toEqual([]);

        expect(_cinGet(cin, ['a', 'b'])).toEqual(undefined);
        expect(_cinTreeArray(cin)).toEqual([]);        

        expect(_cinGet(cin, ['a', 'b', 'c', 'd'])).toEqual(undefined);
        expect(_cinTreeArray(cin)).toEqual([]);            
    })

    it ('should return undefined for undefined nested index', () => {
        let cin = _cinFromArray<string, number>([
            [['a', 'y'], 10]
        ]);
        expect(_cinTreeArray(cin)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]
        }]);
        
        expect(_cinGet(cin, ['a'])).toEqual(undefined);
        expect(_cinTreeArray(cin)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]
        }]);

        expect(_cinGet(cin, ['a', 'b'])).toEqual(undefined);
        expect(_cinTreeArray(cin)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]
        }]);      

        expect(_cinGet(cin, ['b', 'y'])).toEqual(undefined);
        expect(_cinTreeArray(cin)).toEqual([{
            key: 'a', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
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

        expect(_cinGet(cin, ['a'])).toEqual(15);
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

        expect(_cinGet(cin, ['a', 'b'])).toEqual(undefined);
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

        expect(_cinGet(cin, ['a', 'b', 'c'])).toEqual(11);
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

        expect(_cinGet(cin, ['x'])).toEqual(undefined);
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
        
        expect(_cinGet(cin, ['x', 'y'])).toEqual(10);
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