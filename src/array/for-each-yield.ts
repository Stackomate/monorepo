/* Adapted from forEach specification from ECMAScript
https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
Removed thisArgs and replaced callbackFn with yield
disabled Object() call meanwhile for Typescript compatibility
*/
export const forEachYield = function* forEach<T>(arr: T[]) {

    let k: number;

    // if ( arr == null ) {
    //   throw new TypeError( "Array argument is null or not defined" );
    // }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    // let O = Object(arr);
    let O = arr;

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    let len = O.length >>> 0; // Hack to convert O.length to a UInt32

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while( k < len ) {

      let kValue: T;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if ( Object.prototype.hasOwnProperty.call(O, k) ) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[ k ];

        // ii. Call the Call internal method of callback with T as the this value and
        // argument list containing kValue, k, and O.
        yield [kValue, k, O] as [T, number, T[]];
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };