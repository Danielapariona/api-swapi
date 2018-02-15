// https://swapi.co/api/people/?search=luke
const url = 'https://swapi.co/api/people/';

const containerResults = $('.results-swapi-js');
const buttonNext = $('.next-js');

$(document).ready(function () {
  //código a ejecutar
  fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(modalShow)
    .then(searchCharacter)
    .catch(displayErrors);
});

function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.status);
  }
  return res;
}

function parseJSON(res) {
  return res.json()
    .then(function (parsedData) {
      const nextPage = parsedData.next;
      const data = parsedData.results;
      templateCard(data);
    })
}

function templateCard(data) {
  for (let i in data) {
    const name = data[i].name;
    const url = data[i].url;
    containerResults.append(`
    <div class="column card-js">
      <div class="ui fluid card" data-url="${url}">
        <div class="image">
          <img src="assets/images/image.png">
        </div>
        <div class="content">
          <a class="header">${name}</a>
        </div>
      </div>
    </div>`);
  }
}

function displayErrors(err) {
  console.log("INSIDE displayErrors!");
  console.log(err);
}

function modalShow() {
  const card = $('.card');
  card.on('click', function () {
    var url = $(this).data('url');
    fetch(url)
      .then(showDataModal);
  });
}

function showDataModal(res) {
  return res.json()
    .then(function (parsedData) {
      data(parsedData);
      $('.ui.modal').modal('show');
    });
}

function data(dataModal) {
  // Selectores
  const headerModal = $('.ui.header');
  const birthYear = $('#birth-year');
  const eyeColor = $('#eye-color');
  const gender = $('#gender');
  const hairColor = $('#hair-color');
  const height = $('#height');
  const mass = $('#mass');
  const skinColor = $('#skin-color');
  // value API
  birthYear.text(dataModal.birth_year);
  headerModal.text(dataModal.name);
  eyeColor.text(dataModal.eye_color);
  gender.text(dataModal.gender);
  hairColor.text(dataModal.hair_color);
  height.text(dataModal.height);
  mass.text(dataModal.mass);
  skinColor.text(dataModal.skin_color);
}

function searchCharacter() {
  $('#search-character-js').on('input', function () {
    const valueSearch = $('#search-character-js').val();
    const search = `https://swapi.co/api/people/?search=${valueSearch}`;
    fetch(search)
      .then(function (res) {
        return res.json()
          .then(function (parsedData) {
            const data = parsedData.results;
            const $elements = $('.card-js');
            $elements.detach();
            templateCard(data);
          })
          .then(modalShow);
      });
  });
}