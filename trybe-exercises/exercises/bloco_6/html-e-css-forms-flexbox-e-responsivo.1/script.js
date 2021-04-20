const selectState = document.getElementById('select-state')
const selectForms = document.getElementById('form-container')
const getSubmitButtom = document.getElementById('submit-button')
const getDiv = document.getElementById('dados')


let estados = {   'AC': 'Acre',
'AL': 'Alagoas',
'AP': 'Amapá',
'AM': 'Amazonas',
'BA': 'Bahia',
'CE': 'Ceará',
'DF': 'Distrito Federal',
'ES': 'Espírito Santo',
'GO': 'Goías',
'MA': 'Maranhão',
'MT': 'Mato Grosso',
'MS': 'Mato Grosso do Sul',
'MG': 'Minas Gerais',
'PA': 'Pará',
'PB': 'Paraíba',
'PR': 'Paraná',
'PE': 'Pernambuco',
'PI': 'Piauí',
'RJ': 'Rio de Janeiro',
'RN': 'Rio Grande do Norte',
'RS': 'Rio Grande do Sul',
'RO': 'Rondônia',
'RR': 'Roraíma',
'SC': 'Santa Catarina',
'SP': 'São Paulo',
'SE': 'Sergipe',
'TO': 'Tocantins'
}

// Functions

function clearDiv() {
  getDiv.innerHTML = ''
}

getSubmitButtom.addEventListener('click', submitButton)
function submitButton(event) {
  event.preventDefault()
  clearDiv()

  const newData = new FormData(selectForms)
  for(index of newData.entries()) {
    const createParagraph = document.createElement('p')
    getDiv.appendChild(createParagraph)
    createParagraph.innerText = index[1]
  }
  
}


function createState() {
  for (let index = 0; index < 27; index += 1) {
    const createOption = document.createElement('option')
    selectState.appendChild(createOption)
    createOption.innerText = Object.values(estados)[index]
    createOption.value = Object.keys(estados)[index]
  }
}

window.onload = function() {
  createState()
}
