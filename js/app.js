// https://swapi.co/api/people/?page=1
const url = 'https://swapi.co/api/people/';
let numbCharacter = '';

const containerResults = $('.results-swapi-js');
const buttonNext = $('.next-js');

$(document).ready(function () {
  //código a ejecutar
  fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    /* .then(modalShow) */
    .then(searchCharacter)
    .catch(displayErrors);
  $('#search-character-js').focus();
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
      numbCharacter = parsedData.count;
      const nextPage = parsedData.next;
      console.log(nextPage);
      nextPagex(nextPage);
      const data = parsedData.results; // data de los personajes
      templateCard(data);
    })
};

function nextPagex(url) {
  fetch(url)
    .then(function (response) {
      return response.json()
    }).then(function (parsedData) {
      const data = parsedData.results; // data de los personajes
      const urlNext = parsedData.next; // pagina siguiente
      if (urlNext == null) {
        console.log('ya no hay más sgte');
      } else {
        nextPagex(urlNext);
        templateCard(data);
      }
    })
    .catch(function (error) {
      console.log(error);
    })
}

function templateCard(data) {
  for (let i = 0; i < data.length; i++) {
    const name = data[i].name;
    const url = data[i].url;
    const arrayUrl = url.split('/');
    const codeImage = arrayUrl[5];
    // console.log(codeImage);
    containerResults.append(`
    <div class="column card-js">
      <div class="ui fluid card" data-url="${url}" data-image="${codeImage}">
        <div class="image">
          <img src="https://starwars-visualguide.com/assets/img/characters/${codeImage}.jpg">
          <!-- <img src="assets/images/image.png"> -->
        </div>
        <div class="content">
          <a class="header">${name}</a>
        </div>
      </div>
    </div>`);
  }
}

function modalShow() {
  /* const card = $('.card');
  console.log(card);
  card.on('click', function () { */
    var url = $(this).data('url');
    var codeImage = $(this).data('image');
    $('#image-modal-js').attr('src', `https://starwars-visualguide.com/assets/img/characters/${codeImage}.jpg`);
    console.log(codeImage);
    fetch(url)
      .then(showDataModal);
  /* }); */
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
  const headerModal = $('#header-modal-js');
  const imageModal = $('#image-modal-js');
  const birthYear = $('#birth-year');
  const eyeColor = $('#eye-color');
  const gender = $('#gender');
  const hairColor = $('#hair-color');
  const height = $('#height');
  const mass = $('#mass');
  const skinColor = $('#skin-color');
  // value API
  /* imageModal.attr("src",""); */
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

function displayErrors(err) {
  console.log("INSIDE displayErrors!");
  console.log(err);
}

$(document).on('click', '.card', modalShow);