// Exercício 1
const assert = require('assert');

const soma = (a,b) => a + b;

const expected = soma(4, 5);

assert.strictEqual(expected, 9, 'erro');

// Exercício 2


const expected = soma(0, 0);

assert.strictEqual(expected, 0, 'erro');