// https://swapi.co/api/people/?search=r2
const url = 'https://swapi.co/api/people/';

const containerResults = $('.results-swapi');
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
      console.log(parsedData.results[0]);
      /* return parsedData.results; */
      containerResults.append('<div></div>');
    })
}

function updateProfile(data) {

}

function displayErrors(err) {
  console.log("INSIDE displayErrors!");
  console.log(err);
}