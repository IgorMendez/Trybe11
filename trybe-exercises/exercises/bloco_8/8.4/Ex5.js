const assert = require('assert');

const names = [
  'Aanemarie', 'Adervandes', 'Akifusa',
  'Abegildo', 'Adicellia', 'Aladonata',
  'Abeladerco', 'Adieidy', 'Alarucha',
];

function containsA() {
  return names.map((el) => el.toLowerCase().split('')
  .reduce((acc, el) => {
    if (el === 'a') {
      acc += 1;
    } return acc
  },0))
  .reduce((acc, el) => acc + el)
}

assert.deepStrictEqual(containsA(), 20);