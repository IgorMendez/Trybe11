// Desafio 10
function techList(arrTech, lame) {
  let arr2 = [];
  if (arrTech.length === 0) return 'Vazio!';
  arrTech.sort().forEach((element) => { arr2.push({ tech: element, name: lame }); });
  return arr2;
}

// Função aux Desafio 11
function auxiliar(y) {
  let counts = {};
  y.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
  return Math.max.apply(null, Object.values(counts));
}

// Função aux2 Desafio 11
function auxiliar2(z) {
  for (let index = 0; index < z.length; index += 1) {
    if (z[index] < 0 || z[index] > 9) {
      return false;
    }
  }
}

// Desafio 11
function generatePhoneNumber(x) {
  if (x.length !== 11) return 'Array com tamanho incorreto.';
  for (let index = 0; index < x.length; index += 1) {
    if (auxiliar(x) >= 3 || auxiliar2(x) === false) {
      return 'não é possível gerar um número de telefone com esses valores';
    }
  }
  return x.join('').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  return (lineA < Math.abs(lineB + lineC) && lineA > Math.abs(lineB - lineC));
}

// Desafio 13
function hydrate(string) {
  let check = string.match(/\d+/g);
  let count = 0;
  check.forEach((element) => { count += Number(element); });
  if (count === 1) {
    return `${count} copo de água`;
  }
  return `${count} copos de água`;
}

module.exports = {
  generatePhoneNumber,
  techList,
  hydrate,
  triangleCheck,
};
