const bodyElement = document.body;

const criarH1 = document.createElement('h1');
bodyElement.appendChild(criarH1);
criarH1.innerHTML = 'Exercício 5.2 - JavaScript DOM';

const mainContent = document.createElement('div');
bodyElement.appendChild(mainContent);
mainContent.classList.add('main-content');

const centerContent = document.createElement('div');
mainContent.appendChild(centerContent);
centerContent.classList.add('center-content');

const criaP = document.createElement('p');
centerContent.appendChild(criaP)
criaP.innerHTML = 'Aprendendo a aprender'

const leftContent = document.createElement('div')
mainContent.appendChild(leftContent)
leftContent.classList.add('left-content')

const rightContent = document.createElement('div')
mainContent.appendChild(rightContent)
rightContent.classList.add('right-content')
