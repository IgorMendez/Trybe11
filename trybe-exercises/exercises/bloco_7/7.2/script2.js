// Parte 2

const lesson1 = {
  materia: 'Matemática',
  numeroEstudantes: 20,
  professor: 'Maria Clara',
  turno: 'manhã',
};

const lesson2 = {
  materia: 'História',
  numeroEstudantes: 20,
  professor: 'Carlos',
};

const lesson3 = {
  materia: 'Matemática',
  numeroEstudantes: 10,
  professor: 'Maria Clara',
  turno: 'noite',
};

// Exercício 1

const addTurno = (lesson, key, value) => lesson[key] = value
addTurno(lesson2, 'turno' , 'manhã')
console.log(lesson2)

// Exercício 2

const listKeys = (obj) => Object.keys(obj)
console.log(listKeys(lesson3))

// Exercicío 3

const objLength = (obj) => Object.keys(obj).length
console.log(objLength(lesson3))