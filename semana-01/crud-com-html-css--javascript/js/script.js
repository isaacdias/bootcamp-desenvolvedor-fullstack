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
    // If the enter key is typed, the insertName function is called
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
  // Monitoring keystrokes
  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}
// render the names in the list
function render() {
  // function to create delete button
  function createDeleteButton(index) {
    // deleting names
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
  // get the list of html
  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  // create ul
  // create li's, from globalNames
  var ul = document.createElement('ul');
  // traversing the globalNames array
  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    // create the element list
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
