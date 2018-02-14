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
              <img src="">
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
      const name = parsedData.name;
      const headerModal = $('.ui.modal>.header:not(.ui)');
      headerModal.text(name);
      $('.ui.modal').modal('show');
    });
}