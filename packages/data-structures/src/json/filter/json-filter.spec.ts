import { AddOperation, Operation, RemoveOperation } from 'fast-json-patch';
import { applyOperation } from './addItem';
import { JSONFilter, Ops } from './filter';
import { v4 as uuidv4 } from 'uuid';

var seedrandom = require('seedrandom');
var rng = seedrandom('JSON Streams');

const randomIndex = <T>(array: T[], extra = 0) => {
    let randomNumber = rng();
    let chosenIndex = Math.floor(randomNumber * (array.length + extra));
    return chosenIndex;
}

const randomChoice = <T>(array: T[]) => {
    return array[randomIndex(array)];
}

const randomChars = () => {
    return uuidv4();
}

/* TODO: Type */
const randomAddItem = <T>(array: T[]): AddOperation<any> => {
    let chosenIndex = randomIndex(array, 1);
    return {
        op: Ops.Add,
        path: `/${chosenIndex}`,
        value: {
            age: Math.floor(rng() * 70)
        }
    };
}
const randomDeleteItem = <T>(array: T[]): RemoveOperation => {
    let chosenIndex = randomIndex(array);
    return {
        op: Ops.Remove,
        path: `/${chosenIndex}`,
    };    
}
const randomAddItemProperty = <T>(array: T[]) : AddOperation<any> => {
    let chosenIndex = randomIndex(array);
    return {
        op: Ops.Add,
        path: `/${chosenIndex}/${randomChars()}`,
        value: randomChars()
    };    
}
const randomChangeItemProperty = () => {}

const randomDeleteItemProperty = <T>(array: T[]) : RemoveOperation => {
    let chosenIndex = randomIndex(array);
    return {
        op: Ops.Remove,
        path: `/${chosenIndex}/${randomChoice(Object.keys(array[chosenIndex]))}`
    };     
}

describe('json', () => {

    describe('filter', () => {
        /* Dynamically generated tests with reproducible seed */
        it('runs', () => {

            let doc = [{ age: 18 }, { age: 10 }, { age: 22 }, { age: 29 }];

            let filterStream = JSONFilter(() => doc, (i, index) => {
                if (!i) console.log('HERE', index, doc, i);
                return i.age >= 18
            });
            let filterResult = null;

            for (let i = 0, j = 250; i < j; i++) {
                /* TODO: Type */
                let choices: Function[] = [randomAddItem]
                if (doc.length > 0) {
                    choices.push(randomDeleteItem);
                    choices.push(randomAddItemProperty);
                    choices.push(randomDeleteItemProperty)
                }
                let action: AddOperation<any> | RemoveOperation = randomChoice(choices)(doc);
                console.log('ORIGINAL (BEFORE)', doc);
                console.log('ACTION', action);
                doc = applyOperation(doc, action).newDocument;
                console.log('ORIGINAL (AFTER)', doc);

                console.log('FILTERED (BEFORE)', filterResult)
                let summary = filterStream([action])
                filterResult = summary[1];
                console.log('FILTERED ACTION', summary[0]);                
                console.log('FILTERED (AFTER)', summary[1]);
                console.log('INDEX MAPPING (AFTER)', summary[2]);


                expect(summary[1]).toEqual(doc.filter(i => i.age >= 18));
                // expect(summary[2]).toEqual(summary[1].map(i => doc.indexOf(i)));
                expect(summary[2]).toEqual(doc.filter(i => i.age >= 18).map(i => doc.indexOf(i)));
            }

        })

    })


})