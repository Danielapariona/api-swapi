// https://swapi.co/api/people/?search=r2
const url = 'https://swapi.co/api/people/';

const containerResults = $('.results-swapi-js');
$(document).ready(function () {
  //código a ejecutar
  fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    /* .then(updateProfile) */
    .catch(displayErrors);

});

function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.status);
  }
  return res;
}

function parseJSON(res, i) {
  return res.json()
    .then(function (parsedData) {
      const data = parsedData.results;
      console.log(data);
      for (let i in data) {
        const name = data[i].name;
        console.log(name);
        containerResults.append(`
        <div class="column">
          <div class="ui fluid card">
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

function updateProfile(data) {

}

function displayErrors(err) {
  console.log("INSIDE displayErrors!");
  console.log(err);
}