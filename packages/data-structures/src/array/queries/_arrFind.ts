import { Batcher } from '../../batcher';

/* TODO: Compare this with set foreach https://tc39.es/ecma262/#sec-set.prototype.foreach */
/* If you choose forEach iterator, the loop is guaranteed to stop and will skip empty slots in the array. Otherwise, default iterator will be used */
/* TODO: Create function maybe stop, that stops batcher steps similar to a return statement */
/* TODO: BATCHER SHOULD BE A FUNCTION THAT STORES THE CLASS AS A PROPERTY? Performance issues vs flexibility */
// https://stackoverflow.com/questions/36871299/how-to-extend-function-with-es6-classes
// https://stackoverflow.com/questions/19335983/can-you-make-an-object-callable
/* Notice that forEach traverses only defined keys, while for of does not */
/*

maybeContinue/shouldContinue or maybeReturn/shouldReturn
ifElse()

return maybeUpdate() || maybeInsert()

b.run(
    breakOnReturn(
        arrForEachWithBreak((item, index, arr) => {
                if (findOne(item, index, arr)) {
                    _arrSetIndex(b, index, fn(item, index, arr))
                    return BREAK;
                }
        }),
        
        pass(() => {
            batcher;
        })
    )
)

OR

    for (let item of _arrIterate(batcher)) { //iterate needs to be like forEach, not like default forOf
        if (findOne(item, index, arr)) {
            _arrSetIndex(batcher, index, fn(item, index, arr))
            return batcher;
        }
    });

    _arrPush(batcher, fallback(_arrLength(batcher), batcher.currentValue));
    return batcher;

OR

    let [stopped, b] = _arrMaybeForEach(batcher, (item, index, arr) => {
        if (findOne(item, index, arr)) {
            _arrSetIndex(batcher, index, fn(item, index, arr))
            return false;
        }
    });

    if (stopped) batcher;

    _arrPush(batcher, fallback(_arrLength(batcher), batcher.currentValue));
    return batcher;

*/
/* Find traverses empty slots */
export const _arrFind = <T>(batcher: Batcher<Array<T>>, fn: (item: T, index: number, array: Array<T>) => boolean) => {
    return batcher.currentValue.find(fn);
};
