const bodyElement = document.body;

const criarH1 = document.createElement('h1');
bodyElement.appendChild(criarH1);
criarH1.innerHTML = "Exercício 5.2 - JavaScript DOM";

const criaDiv = document.createElement('div');
bodyElement.appendChild(criaDiv);
criaDiv.classList.add('main-content');
