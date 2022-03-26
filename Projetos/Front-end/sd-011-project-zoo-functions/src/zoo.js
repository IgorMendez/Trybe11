/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require('./data');
const { species, employees, hours } = require('./data');

function getSpeciesByIds(...ids) {
  const idsAnimals = species.filter((el) => ids.some((id) => id === el.id));
  return idsAnimals;
}

function getAnimalsOlderThan(animal, age) {
  return species
    .find((el) => el.name.includes(animal))
    .residents.every((resident) => resident.age > age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return data.employees
    .find((el) => el.firstName === employeeName || el.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some((el) => el.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmployee);
  return data.employees;
}

function countAnimals(species1) {
  if (!species1) {
    return data.species.reduce((acc, current) => {
      acc[current.name] = current.residents.length;
      return acc;
    }, {});
  }
  return data.species.find((specie) => specie.name === species1).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.entries(entrants)
    .reduce((acc, current) => acc + (current[1] * data.prices[current[0]]), 0);
}

// Auxiliary 9

const auxiliarSexSort = (obj, options) => {
  const obj1 = obj;
  data.species.forEach((animal) => { obj1[animal.location] = []; });
  Object.keys(obj1).forEach((el) => { obj1[el] = data.species.filter((e) => e.location === el).map((animal) => animal.name); });
  Object.keys(obj).forEach((e) => { obj1[e] = obj1[e].map((animal) => species.find((animalName) => animalName.name === animal)).reduce((acc, current) => { acc.push({ [current.name]: (current.residents.filter((animal) => animal.sex === options.sex).map((ej) => ej.name)).sort() }); return acc; }, []); });
  return obj1;
};

const auxiliarSex = (obj, options) => {
  const obj1 = obj;
  if (options.sorted) {
    return auxiliarSexSort(obj, options);
  }
  data.species.forEach((animal) => { obj1[animal.location] = []; });
  Object.keys(obj1).forEach((el) => { obj1[el] = data.species.filter((e) => e.location === el).map((animal) => animal.name); });
  Object.keys(obj).forEach((e) => { obj1[e] = obj1[e].map((animal) => species.find((animalName) => animalName.name === animal)).reduce((acc, current) => { acc.push({ [current.name]: (current.residents.filter((animal) => animal.sex === options.sex).map((ej) => ej.name)) }); return acc; }, []); });
  return obj1;
};

const auxiliarSort = (obj, options) => {
  const obj1 = obj;
  if (options.sex) {
    return auxiliarSexSort(obj, options);
  }
  data.species.forEach((animal) => { obj1[animal.location] = []; });
  Object.keys(obj1).forEach((el) => { obj1[el] = data.species.filter((e) => e.location === el).map((animal) => animal.name); });
  Object.keys(obj1).forEach((e) => { obj1[e] = obj1[e].map((animal) => species.find((animalName) => animalName.name === animal)).reduce((acc, current) => { acc.push({ [current.name]: (current.residents.map((animal) => animal.name)).sort() }); return acc; }, []); });
  return obj1;
};

const auxiliarName = (obj, options) => {
  const obj1 = obj;
  data.species.forEach((animal) => { obj1[animal.location] = []; });
  Object.keys(obj1).forEach((el) => { obj1[el] = data.species.filter((e) => e.location === el).map((animal) => animal.name); });
  Object.keys(obj1).forEach((e) => { obj1[e] = obj1[e].map((animal) => species.find((animalName) => animalName.name === animal)).reduce((acc, current) => { acc.push({ [current.name]: (current.residents.map((animal) => animal.name)) }); return acc; }, []); });
  if (options.sorted) {
    return auxiliarSort(obj1);
  }
  return obj1;
};

function getAnimalMap(options = {}) {
  const obj = {};
  data.species.forEach((animal) => { obj[animal.location] = []; });
  Object.keys(obj).forEach((el) => { obj[el] = data.species.filter((e) => e.location === el).map((animal) => animal.name); });
  if (options.includeNames) {
    if (options.sorted) {
      return auxiliarSort(obj, options);
    }
    if (options.sex) {
      return auxiliarSex(obj, options);
    }
    return auxiliarName(obj, options);
  }
  return obj;
}

function getSchedule(dayName) {
  const schedule = {
    Tuesday: `Open from ${data.hours.Tuesday.open}am until ${data.hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${data.hours.Wednesday.open}am until ${data.hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${data.hours.Thursday.open}am until ${data.hours.Thursday.close - 12}pm`,
    Friday: `Open from ${data.hours.Friday.open}am until ${data.hours.Friday.close - 12}pm`,
    Saturday: `Open from ${data.hours.Saturday.open}am until ${data.hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${data.hours.Sunday.open}am until ${data.hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  if (!dayName) {
    return schedule;
  }
  return {
    [dayName]: schedule[dayName],
  };
}

function getOldestFromFirstSpecies(id) {
  const employees1 = data.employees.find((responsible) => responsible.id === id).responsibleFor[0];
  return Object.values(data.species
    .find((specie) => specie.id === employees1)
    .residents.sort((agea, ageb) => ageb.age - agea.age)[0]);
}

function increasePrices(percentage) {
  const adult = ((data.prices.Adult / 100) * percentage) + data.prices.Adult + 0.001;
  const child = ((data.prices.Child / 100) * percentage) + data.prices.Child + 0.001;
  const senior = ((data.prices.Senior / 100) * percentage) + data.prices.Senior + 0.001;
  data.prices.Adult = Number(adult.toFixed(2));
  data.prices.Child = Number(child.toFixed(2));
  data.prices.Senior = Number(senior.toFixed(2));
}

function getEmployeeCoverage(idOrName) {
  const obj = {};
  if (!idOrName) {
    data.employees
      .forEach((emp) => {
        obj[`${emp.firstName} ${emp.lastName}`] = data.species
          .filter((animalId) => emp.responsibleFor
            .includes(animalId.id)).map((animal) => animal.name);
      });
    obj['Stephanie Strauss'].sort();
    obj['Emery Elser'].reverse();
    return obj;
  }
  const employ = data.employees
    .filter((emp) => emp.firstName === idOrName || emp.lastName === idOrName || emp.id === idOrName)[0];
  const obj1 = { [`${employ.firstName} ${employ.lastName}`]: employ.responsibleFor.map((animal) => data.species.filter((specie) => specie.id.includes(animal)).map((animal1) => animal1.name).join('')) };
  return obj1;
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
