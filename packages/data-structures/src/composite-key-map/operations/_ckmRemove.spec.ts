import { _ckmTreeArray } from "../query/_ckmTreeArray";
import { _ckmFromArray } from "./_ckmFromArray"
import { _ckmRemove } from "./_ckmRemove";
import { _ckmSet } from "./_ckmSet";

describe('_ckmRemove', () => {
    it ('should not throw on empty composite index', () => {
        let ckm = _ckmFromArray<string, number>([]);
        expect(_ckmTreeArray(ckm)).toEqual([]);
        expect(() => _ckmRemove(ckm, ['a'])).not.toThrow();
        expect(_ckmTreeArray(ckm)).toEqual([]);
    })

    it ('should not throw on composite index with inexistent key removal single depth', () => {
        let ckm = _ckmFromArray<string, number>([
            [['b'], 19]
        ]);
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'b', isKey: true, value: 19, children: []}
        ]);
        expect(() => _ckmRemove(ckm, ['a'])).not.toThrow();
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'b', isKey: true, value: 19, children: []}
        ]);

        ckm = _ckmFromArray<string, number>([
            [['b', 'c'], 19]
        ]);
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'b', isKey: false, value: undefined, children: [
                {key: 'c', isKey: true, value: 19, children: []}
            ]}
        ]);
        expect(() => _ckmRemove(ckm, ['a'])).not.toThrow();
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'b', isKey: false, value: undefined, children: [
                {key: 'c', isKey: true, value: 19, children: []}
            ]}
        ]);
    })

    it ('should not throw on composite index with inexistent key removal nested depth', () => {
        let ckm = _ckmFromArray<string, number>([
            [['b'], 19]
        ]);
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'b', isKey: true, value: 19, children: []}
        ]);
        expect(() => _ckmRemove(ckm, ['a', 'm', 'n'])).not.toThrow();
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'b', isKey: true, value: 19, children: []}
        ]);

        ckm = _ckmFromArray<string, number>([
            [['b', 'c'], 19]
        ]);
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'b', isKey: false, value: undefined, children: [
                {key: 'c', isKey: true, value: 19, children: []}
            ]}
        ]);
        expect(() => _ckmRemove(ckm, ['a', 'm', 'n'])).not.toThrow();
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'b', isKey: false, value: undefined, children: [
                {key: 'c', isKey: true, value: 19, children: []}
            ]}
        ]);
    })    


    it ('should remove on composite index with single depth', () => {
        let ckm = _ckmFromArray<string, number>([
            [['b'], 19]
        ]);
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'b', isKey: true, value: 19, children: []}
        ]);
        expect(() => _ckmRemove(ckm, ['b'])).not.toThrow();
        expect(_ckmTreeArray(ckm)).toEqual([]);

    })    

    it ('should not remove intermediate key on composite index with nested depth', () => {
        let ckm = _ckmFromArray<string, number>([
            [['b', 'c'], 19]
        ]);
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'b', isKey: false, value: undefined, children: [
                {key: 'c', isKey: true, value: 19, children: []}
            ]}
        ]);
        expect(() => _ckmRemove(ckm, ['b'])).not.toThrow();
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'b', isKey: false, value: undefined, children: [
                {key: 'c', isKey: true, value: 19, children: []}
            ]}
        ]);
    })

    it ('should remove intermediate key on composite index with nested depth', () => {
        let ckm = _ckmFromArray<string, number>([
            [['b', 'c'], 19]
        ]);
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'b', isKey: false, value: undefined, children: [
                {key: 'c', isKey: true, value: 19, children: []}
            ]}
        ]);
        expect(() => _ckmRemove(ckm, ['b', 'c'])).not.toThrow();
        expect(_ckmTreeArray(ckm)).toEqual([]);
    })    

    it ('should remove values for defined keys', () => {
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

        expect(() => _ckmRemove(ckm, ['a'])).not.toThrow();
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'a', isKey: false, value: undefined, children: [
                {key: 'b', isKey: false, value: undefined, children: [
                    {key: 'c', isKey: true, value: 11, children: []}
                ]}
            ]},
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);

        expect(() => _ckmRemove(ckm, [''])).not.toThrow();
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'a', isKey: false, value: undefined, children: [
                {key: 'b', isKey: false, value: undefined, children: [
                    {key: 'c', isKey: true, value: 11, children: []}
                ]}
            ]},
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);

        expect(() => _ckmRemove(ckm, ['a'])).not.toThrow();
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'a', isKey: false, value: undefined, children: [
                {key: 'b', isKey: false, value: undefined, children: [
                    {key: 'c', isKey: true, value: 11, children: []}
                ]}
            ]},
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);

        expect(() => _ckmRemove(ckm, ['a', 'b'])).not.toThrow();
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'a', isKey: false, value: undefined, children: [
                {key: 'b', isKey: false, value: undefined, children: [
                    {key: 'c', isKey: true, value: 11, children: []}
                ]}
            ]},
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);   

        expect(() => _ckmRemove(ckm, ['a', 'b', 'c'])).not.toThrow();
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);          

        expect(() => _ckmRemove(ckm, ['x'])).not.toThrow();        
        expect(_ckmTreeArray(ckm)).toEqual([
            {key: 'x', isKey: false, value: undefined, children: [
                {key: 'y', isKey: true, value: 10, children: []}
            ]}
        ]);      
        
        expect(() => _ckmRemove(ckm, ['x', 'y'])).not.toThrow();
        expect(_ckmTreeArray(ckm)).toEqual([]);
    })    

})