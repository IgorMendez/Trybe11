// // Exercício 1

const assert = require('assert');

// function sum(a, b) {
//   if (typeof a !== 'number' || typeof b !== 'number') {
//     throw new Error('parameters must be numbers');
//   }

//   return a + b;
// }

// const expected = soma(4, 5);

// assert.strictEqual(expected, 9, 'erro');


// // Exercício 2, 3

// const expected = soma(0, 0);

// assert.strictEqual(expected, 0, 'erro');


// // Parte 2 
// // Exercício 1

// function myRemove(arr, item) {
//   let newArr = [];
//   for (let index = 0; index < arr.length; index += 1) {
//     if (item !== arr[index]) {
//       newArr.push(arr[index]);
//     }
//   }
//   return newArr;
// }

// let expected = myRemove([1, 2, 3, 4], 3);

// assert.deepStrictEqual(expected ,[1 ,2 ,4] , 'erro')


// // Exercício 2

// assert.notDeepStrictEqual(expected ,[1, 2, 3, 4] , 'erro')


// // Exercício 3

// assert.ok(expected ,[1, 2, 3, 4] );


// // Parte III
// // Exercício 1



function myRemoveWithoutCopy(arr, item) {
  for (let index = 0, len = arr.length; index < len; index += 1) {
    if (arr[index] === item) {
      arr.splice(index, 1);
      index -= 1;
      len -= 1;
    }
  }

  return arr;
}

let expected = myRemoveWithoutCopy([1, 2, 3, 4], 3)

assert.deepStrictEqual(expected, [1, 2, 4])


