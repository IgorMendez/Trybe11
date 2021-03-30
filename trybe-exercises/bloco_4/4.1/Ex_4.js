// Com o mesmo código do exercício anterior, caso valor final seja maior que 20, imprima a mensagem: "valor maior que 20". Caso não seja, imprima a mensagem: "valor menor ou igual a 20";

let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27]

const sum = numbers.reduce(function (sumArr, num) {
  return sumArr + num
})

const meanAri = sum / numbers.length

meanAri < 20 ? console.log("Valor menor que 20") : console.log("Valor maior que 20")
