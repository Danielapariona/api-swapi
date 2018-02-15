// https://swapi.co/api/people/?search=r2
const url = 'https://swapi.co/api/people/';

const containerResults = $('.results-swapi-js');
const buttonNext = $('.next-js');

$(document).ready(function () {
  //código a ejecutar
  fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(modalShow)
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
      // console.log(data);
      for (let i in data) {
        const name = data[i].name;
        const url = data[i].url;
        containerResults.append(`
        <div class="column">
          <div class="ui fluid card" data-url="${url}">
            <div class="image">
              <img src="assets/images/image.png">
            </div>
            <div class="content">
              <a class="header">${name}</a>
            </div>
          </div>
        </div>`
        );
      }
    })
}

function displayErrors(err) {
  console.log("INSIDE displayErrors!");
  console.log(err);
}

function modalShow() {
  const card = $('.card');
  card.on('click', function () {
    var url = $(this).data('url');
    console.log(url);
    getInfo(url);
  });
}

function getInfo(idPeople) {
  fetch(idPeople)
    .then(updateInfo);
}

function updateInfo(res) {
  return res.json()
    .then(function (parsedData) {
      data(parsedData);
      $('.ui.modal').modal('show');
    });
}

function data(dataModal) {
  console.log(dataModal);
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