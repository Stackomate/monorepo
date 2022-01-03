import { _cinTreeArray } from "../query/_cinTreeArray";
import { _cinFromArray } from "./_cinFromArray"
import { _cinRemove } from "./_cinRemove";
import { _cinSet } from "./_cinSet";

describe('_cinRemove', () => {
    it ('should not throw on empty composite index', () => {
        let cin = _cinFromArray<string, number>([]);
        expect(_cinTreeArray(cin)).toEqual([]);
        expect(() => _cinRemove(cin, ['a'])).not.toThrow();
        expect(_cinTreeArray(cin)).toEqual([]);
    })

    it ('should not throw on composite index with inexistent key removal single depth', () => {
        let cin = _cinFromArray<string, number>([
            [['b'], 19]
        ]);
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'b', isKey: true, value: 19, children: []}
        ]);
        expect(() => _cinRemove(cin, ['a'])).not.toThrow();
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'b', isKey: true, value: 19, children: []}
        ]);

        cin = _cinFromArray<string, number>([
            [['b', 'c'], 19]
        ]);
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'b', isKey: false, value: undefined, children: [
                {key: 'c', isKey: true, value: 19, children: []}
            ]}
        ]);
        expect(() => _cinRemove(cin, ['a'])).not.toThrow();
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'b', isKey: false, value: undefined, children: [
                {key: 'c', isKey: true, value: 19, children: []}
            ]}
        ]);

    })

    it ('should not throw on composite index with inexistent key removal nested depth', () => {
        let cin = _cinFromArray<string, number>([
            [['b'], 19]
        ]);
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'b', isKey: true, value: 19, children: []}
        ]);
        expect(() => _cinRemove(cin, ['a', 'm', 'n'])).not.toThrow();
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'b', isKey: true, value: 19, children: []}
        ]);

        cin = _cinFromArray<string, number>([
            [['b', 'c'], 19]
        ]);
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'b', isKey: false, value: undefined, children: [
                {key: 'c', isKey: true, value: 19, children: []}
            ]}
        ]);
        expect(() => _cinRemove(cin, ['a', 'm', 'n'])).not.toThrow();
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'b', isKey: false, value: undefined, children: [
                {key: 'c', isKey: true, value: 19, children: []}
            ]}
        ]);
    })    


    it ('should remove on composite index with single depth', () => {
        let cin = _cinFromArray<string, number>([
            [['b'], 19]
        ]);
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'b', isKey: true, value: 19, children: []}
        ]);
        expect(() => _cinRemove(cin, ['b'])).not.toThrow();
        expect(_cinTreeArray(cin)).toEqual([]);

    })    

    it ('should not remove intermediate key on composite index with nested depth', () => {
        let cin = _cinFromArray<string, number>([
            [['b', 'c'], 19]
        ]);
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'b', isKey: false, value: undefined, children: [
                {key: 'c', isKey: true, value: 19, children: []}
            ]}
        ]);
        expect(() => _cinRemove(cin, ['b'])).not.toThrow();
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'b', isKey: false, value: undefined, children: [
                {key: 'c', isKey: true, value: 19, children: []}
            ]}
        ]);
    })

    it ('should remove intermediate key on composite index with nested depth', () => {
        let cin = _cinFromArray<string, number>([
            [['b', 'c'], 19]
        ]);
        expect(_cinTreeArray(cin)).toEqual([
            {key: 'b', isKey: false, value: undefined, children: [
                {key: 'c', isKey: true, value: 19, children: []}
            ]}
        ]);
        expect(() => _cinRemove(cin, ['b', 'c'])).not.toThrow();
        expect(_cinTreeArray(cin)).toEqual([]);
    })    

})