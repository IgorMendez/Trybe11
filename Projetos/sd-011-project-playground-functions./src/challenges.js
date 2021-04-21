// Desafio 1
function compareTrue(expression, expression2) {
  if (expression && expression2 === true) {
    return true;
  }
  return false;
}

// Desafio 2
function calcArea(base, height) {
  return (base * height) / 2;
}

// Desafio 3
function splitSentence(string) {
  return string.split(' ');
}

// Desafio 4
function concatName(stringArr) {
  let arr = [stringArr.pop(stringArr), stringArr.shift(stringArr)];
  return arr.join(', ');
}

// Desafio 5
function footballPoints(wins, ties) {
  return (wins * 3) + (ties * 1);
}

// Desafio 6
function highestCount(x) {
  let soma = 0;
  for (let index = 0; index < x.length; index += 1) {
    if (Math.max.apply(null, x) === x[index]) { soma += 1; }
  }
  return soma;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  const dist1 = Math.abs(cat1 - mouse);
  const dist2 = Math.abs(cat2 - mouse);
  if (dist1 === dist2) return 'os gatos trombam e o rato foge';
  if (dist1 < dist2) return 'cat1';
  if (dist1 > dist2) return 'cat2';
}

// Desafio 8
function fizzBuzz(x) {
  let result = [];
  for (let index = 0; index < x.length; index += 1) {
    const three = x[index] % 3 === 0;
    const five = x[index] % 5 === 0;
    result[index] = 'bug!';
    if (x[index] % 15 === 0) {
      result[index] = 'fizzBuzz';
    } else if (three) {
      result[index] = 'fizz';
    } else if (five) {
      result[index] = 'buzz';
    }
  }
  return result;
}

// Desafio 9
function encode(string) {
  let string2 = '';
  string.split('').forEach((element) => {
    string2 += element.replace('a', 1)
      .replace('e', 2)
      .replace('i', 3)
      .replace('o', 4)
      .replace('u', 5);
  });
  return string2;
}

function decode(string1) {
  let string2 = '';
  string1.split('').forEach((element) => {
    string2 += element.replace(1, 'a')
      .replace(2, 'e')
      .replace(3, 'i')
      .replace(4, 'o')
      .replace(5, 'u');
  });
  return string2;
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
