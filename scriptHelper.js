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
    launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
    launchStatus.style.color = 'rgb(199, 37, 78)';
    faultyItems.style.visibility = 'hidden';
    return window.alert('All fields are required!');
  }

  // Fuel bad, cargo good
  if (fuelLevel < 10000 && cargoLevel < 10001) {
    readyForLaunch = false;
    faultyItems.style.visibility = 'visible';
    launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
    launchStatus.style.color = 'rgb(199, 37, 78)'; // red
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    fuelStatus.innerHTML = 'Fuel level too low for launch';
    cargoStatus.innerHTML = 'Cargo mass low enough for launch';
  }

  // Fuel bad, cargo bad
  if (fuelLevel < 10000 && cargoLevel > 10000) {
    readyForLaunch = false;
    faultyItems.style.visibility = 'visible';
    launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
    launchStatus.style.color = 'rgb(199, 37, 78)'; // red
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    fuelStatus.innerHTML = 'Fuel level too low for launch';
    cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
  }

  // Fuel good, cargo bad
  if (fuelLevel > 9999 && cargoLevel > 10000) {
    readyForLaunch = false;
    faultyItems.style.visibility = 'visible';
    launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
    launchStatus.style.color = 'rgb(199, 37, 78)'; // red
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    fuelStatus.innerHTML = 'Fuel level high enough for launch';
    cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
  }

  // Fuel good, cargo good
  if (readyForLaunch) {
    faultyItems.style.visibility = 'visible';
    launchStatus.innerHTML = 'Shuttle is Ready for Launch';
    launchStatus.style.color = 'rgb(65, 159, 106)'; // green
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    fuelStatus.innerHTML = 'Fuel level high enough for launch';
    cargoStatus.innerHTML = 'Cargo mass low enough for launch';
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
