window.addEventListener('load', start);

var globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
var inputName = null;
var isEditing = false;
currentIndex = null;

function start() {
  // getting the input
  inputName = document.querySelector('#inputName');

  preventFormSubmit();
  activateInput();
  render();
}

// blocking page refresh
function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

// Cursor on input when the page is loaded
function activateInput() {
  // Inserting the entered value into array
  function insertName(newName) {
    globalNames.push(newName);
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }
  // monitor the input value
  function handleTyping(event) {
    var hasText = !!event.target.value && event.target.value.trim() !== '';

    if (!hasText) {
      clearInput();
      return;
    }
    // se a tecla enter for digitada a função insertName é chamada
    if (event.key === 'Enter') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }
      render();
      isEditing = false;
      clearInput();
    }
  }
  // monitorando as tyeclas digitadas
  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}
// renderizar os nomes na div de lista
function render() {
  // função para criar botão delete
  function createDeleteButton(index) {
    // deletando names
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);
    return span;
  }
  // obter a lista do html
  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  // criar ul
  // fazer n li's, conforme tamanho de globalNames
  var ul = document.createElement('ul');
  // percorrendo o array globalNames
  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    // criando os elementos da lista
    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}
