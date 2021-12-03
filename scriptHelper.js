require('isomorphic-fetch');

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  let missionTarget = document.getElementById('missionTarget');
  missionTarget.innerHTML += `<h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">`;
}

function validateInput(testInput) {
  if (testInput === '') {
    return 'Empty';
  }
  testInput = Number(testInput);
  return isNaN(testInput) ? 'Not a Number' : 'Is a Number';
}

function formSubmission(
  document,
  list,
  pilot,
  copilot,
  fuelLevel,
  cargoLevel
) {}

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch(
    'https://handlers.education.launchcode.org/static/planets.json'
  ).then(response => response.json());

  return planetsReturned;
}

function pickPlanet(planets) {
  return Math.floor(Math.random() * planets.length);
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
