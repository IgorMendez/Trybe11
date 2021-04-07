const bodyElement = document.body;

const criarH1 = document.createElement('h1');
bodyElement.appendChild(criarH1);
criarH1.innerHTML = 'Exercício 5.2 - JavaScript DOM';

const criaDiv = document.createElement('div');
bodyElement.appendChild(criaDiv);
criaDiv.classList.add('main-content', 'left-content');

const criaDiv2 = document.createElement('div');
criaDiv.appendChild(criaDiv2);
criaDiv2.classList.add('center-content');

const criaP = document.createElement('p');
criaDiv2.appendChild(criaP)
criaP.innerHTML = 'Aprendendo a aprender'