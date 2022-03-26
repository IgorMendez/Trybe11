const criarTarefa = document.getElementById('criar-tarefa');
const textoTarefa = document.getElementById('texto-tarefa');
const listTarefas = document.getElementById('lista-tarefas');
const clearAll = document.getElementById('apaga-tudo');
const buttonRem = document.getElementById('remover-finalizados');
const buttonSave = document.getElementById('salvar-tarefas');
const listaTarefaArr = listTarefas.children;

function clearTable() {
  listTarefas.innerHTML = '';
}

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

const li = listTarefas.getElementsByClassName('completed');

function removeLi() {
  for (let index = 0; index < li.length;) {
    listTarefas.removeChild(li[index]);
  }
}

function saveTasks() {
  localStorage.clear();
  const getLi = document.getElementsByTagName('li');
  for (let index = 0; index < getLi.length; index += 1) {
    if (getLi[index].className === 'completed') {
      localStorage.setItem(`item${index}`, `${getLi[index].firstChild.wholeText}, completed`);
    }
  }
  alert('Tarefas Salvas');
}

function listTask(text, classCompleted, listaTarefa) {
  const task = document.createElement('li');
  task.innerText = text;
  task.className = classCompleted;
  listaTarefa.appendChild(task);
}

function loadTasks(listaTarefa) {
  for (let index = 0; index < localStorage.length; index += 1) {
    const text = localStorage.getItem(`item${index}`).split(',');
    listTask(text[0], text[1], listaTarefa);
  }
}

loadTasks(listTarefas);
buttonSave.addEventListener('click', saveTasks);
buttonRem.addEventListener('click', removeLi);
clearAll.addEventListener('click', clearTable);
listTarefas.addEventListener('click', setListColor);
criarTarefa.addEventListener('click', getText);
