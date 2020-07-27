let allUsers = [];
let filteredUsers = [];

let tabPeople = document.querySelector('#tab-people');
let tabInformation = document.querySelector('#tab-information');
let inputText = document.querySelector('#input-text');
let loading = document.querySelector('.loading');
let btnSearch = document.querySelector('#btn-search');
let textUsers = document.querySelector('#text-users');
let textInfo = document.querySelector('#text-info');

window.addEventListener('load', () => {
  loadUsers();
});

btnSearch.addEventListener('click', searchUser);

async function loadUsers() {
  const resource = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await resource.json();
  allUsers = json.results.map((user) => {
    return {
      name: user.name.first + ' ' + user.name.last,
      picture: user.picture.thumbnail,
      age: user.dob.age,
      gender: user.gender,
    };
  });

  allUsers.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  numberFormat = Intl.NumberFormat('pt-BR');
  setTimeout(isLoaded, 500);
}

function searchUser() {
  filteredUsers = allUsers.filter((user) => {
    return user.name.toLowerCase().includes(inputText.value.toLowerCase());
  });
  renderFilteredUsers();
  renderInformation(filteredUsers);
}

function renderFilteredUsers() {
  let usersHTML = '<div>';

  filteredUsers.forEach((user) => {
    const { picture, name, age } = user;

    const userHTML = `<div class='user'> <div id="profile"> <br>
    <img src="${picture}" alt="${name}" id=imgs>
    <ul>
    <li> ${name} ${age} anos </li>
    </ul>
    </div>
    `;
    usersHTML += userHTML;
  });
  usersHTML += '</div>';
  tabPeople.innerHTML = usersHTML;
  textUsers.innerHTML = `${filteredUsers.length} usuário(s) encontrado(s  )`;
}

function renderInformation(users) {
  tabInformation.innerHTML = '';

  let statisticElement = document.createElement('div');

  if (users.length !== 0) {
    let maleStatisticElement = document.createElement('div');
    const maleUsersStatistics = users.reduce(
      (acumulator, current) =>
        current.gender === 'male' ? ++acumulator : acumulator,
      0
    );
    maleStatisticElement.textContent = `Sexo masculino ${maleUsersStatistics}`;
    statisticElement.appendChild(maleStatisticElement);

    let femaleStatisticElement = document.createElement('div');
    const femaleUsersStatistics = users.reduce(
      (acumulator, current) =>
        current.gender === 'female' ? ++acumulator : acumulator,
      0
    );
    femaleStatisticElement.textContent = `Sexo feminino ${femaleUsersStatistics}`;
    statisticElement.appendChild(femaleStatisticElement);

    let AgeSumStatistics = document.createElement('div');
    const usersAgeSum = users.reduce(
      (acumulator, current) => acumulator + current.age,
      0
    );
    AgeSumStatistics.textContent = `Soma das idades: ${formatNumber(
      usersAgeSum.toFixed(2)
    )}`;
    statisticElement.appendChild(AgeSumStatistics);

    let AgeAvgStatistics = document.createElement('div');
    const usersAgeAvg = usersAgeSum / users.length;
    AgeAvgStatistics.textContent = `Média das idades: ${formatNumber(
      usersAgeAvg.toFixed(2)
    )}`;
    statisticElement.appendChild(AgeAvgStatistics);
  }
  tabInformation.appendChild(statisticElement);
  textInfo.innerHTML = 'Estatísticas ';
}

function formatNumber(number) {
  return numberFormat.format(number);
}

function isLoaded() {
  loading.style.display = 'none';
}
