const criarTarefa = document.getElementById('criar-tarefa');
const textoTarefa = document.getElementById('texto-tarefa');
const listTarefas = document.getElementById('lista-tarefas');
// const clearAll = document.getElementById('apaga-tudo')
const listaTarefaArr = listTarefas.children;

function getText() {
  const criaLista = document.createElement('li');
  listTarefas.appendChild(criaLista);
  if (textoTarefa.value !== '') {
    listTarefas.lastChild.innerText = textoTarefa.value;
    textoTarefa.value = '';
  } else {
    listTarefas.lastChild.remove();
  }
}

function rowText(div) {
  if (div.path[0].classList.value === 'completed') {
    div.path[0].classList.remove('completed');
  } else {
    console.log(div.path[0].style);
    div.path[0].classList.add('completed');
  }
}

function removeColor() {
  for (let index = 0; index < listTarefas.childNodes.length; index += 1) {
    listTarefas.childNodes[index].style.backgroundColor = '';
    listaTarefaArr[index].addEventListener('dblclick', rowText);
  }
}

function setListColor(e) {
  removeColor();
  if (e.target.innerText) {
    e.target.style.backgroundColor = 'rgb(128,128,128)';
  }
}

listTarefas.addEventListener('click', setListColor);
criarTarefa.addEventListener('click', getText);
