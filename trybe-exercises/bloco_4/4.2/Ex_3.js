// Para o terceiro exercício, calcule e imprima a média aritmética dos valores contidos no array;

let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27]

const sum = numbers.reduce(function (sumArr, num) {
  return sumArr + num
})

console.log(sum / numbers.length)
