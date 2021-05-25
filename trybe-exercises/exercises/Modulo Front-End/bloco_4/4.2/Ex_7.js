// Utilizando for , descubra qual o menor valor contido no array e imprima-o;

let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27]

let higher = Number.POSITIVE_INFINITY // encontrei ajuda nesse site https://cursos.alura.com.br/forum/topico-guardar-menor-valor-127943

for (index = 0; index < numbers.length; index += 1) {
  if(numbers[index] < higher) {
    higher = numbers[index]
  }
}
console.log(higher)
