// Parte 1

// Exercício 1

const testingScope = (escopo) => {
    if (escopo === true) {
      var ifScope = 'Não devo ser utilizada fora do meu escopo (if)';
      console.log(`${ifScope} 'ótimo, fui utilizada no escopo !`);
    } else {
      var elseScope = 'Não devo ser utilizada fora meu escopo (else)';
      console.log(elseScope);
    }
  }

testingScope(true);

// 'Exercício 2'

const oddsAndEvens = [13, 3, 4, 10, 7, 2];

oddsAndEvens.sort((a, b) => a - b)

console.log(`Os números ${oddsAndEvens} se encontram ordenados de forma crescente!`);

// Parte 2

// Exercicio 1

const fac = (n) => n === 0 ? n = 1 : n * fac (n - 1);

console.log(fac(3))