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

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  let readyForLaunch = true;
  let faultyItems = document.getElementById('faultyItems');
  let launchStatus = document.getElementById('launchStatus');
  let pilotStatus = document.getElementById('pilotStatus');
  let copilotStatus = document.getElementById('copilotStatus');
  let fuelStatus = document.getElementById('fuelStatus');
  let cargoStatus = document.getElementById('cargoStatus');

  if (
    validateInput(pilot) !== 'Not a Number' ||
    validateInput(copilot) !== 'Not a Number' ||
    validateInput(fuelLevel) !== 'Is a Number' ||
    validateInput(cargoLevel) !== 'Is a Number'
  ) {
    launchStatus.innerHTML = 'Shuttle not ready for launch';
    launchStatus.style.color = 'Red';
    faultyItems.style.visibility = 'hidden';
    return window.alert('All fields are required!');
  }

  if (fuelLevel < 10000) {
    readyForLaunch = false;
    fuelStatus.innerHTML = 'There is not enough fuel to make the journey';
    launchStatus.innerHTML = 'Shuttle not ready for launch';
    launchStatus.style.color = 'Red';
    faultyItems.style.visibility = 'visible';
  }

  if (cargoLevel > 10000) {
    readyForLaunch = false;
    cargoStatus.innerHTML =
      'There is too much mass for the shuttle to take off';
    launchStatus.innerHTML = 'Shuttle not ready for launch';
    launchStatus.style.color = 'Red';
    faultyItems.style.visibility = 'visible';
  }

  if (readyForLaunch) {
    launchStatus.innerHTML = 'Shuttle is ready for launch';
    launchStatus.style.color = 'Green';
    launchStatus.style.visibility = 'visible';
    fuelStatus.innerHTML = 'Fuel level high enough for launch';
    cargoStatus.innerHTML = 'Cargo mass low enough for launch';
    faultyItems.style.visibility = 'visible';
  }
}

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
