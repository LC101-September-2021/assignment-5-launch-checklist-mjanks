window.addEventListener('load', function () {
  let listedPlanets;
  let pilotName = document.querySelector('input[name=pilotName]');
  let copilotName = document.querySelector('input[name=copilotName]');
  let fuelLevel = document.querySelector('input[name=fuelLevel]');
  let cargoMass = document.querySelector('input[name=cargoMass]');
  let submitButton = document.getElementById('formSubmit');

  submitButton.addEventListener('click', e => {
    e.preventDefault();
    formSubmission(
      document,
      listedPlanets,
      pilotName.value,
      copilotName.value,
      fuelLevel.value,
      cargoMass.value
    );
  });

  // Set listedPlanetsResponse equal to the value returned
  // by calling myFetch()
  let listedPlanetsResponse = myFetch();

  listedPlanetsResponse
    .then(function (result) {
      listedPlanets = result;
      console.log(listedPlanets);
    })
    .then(function () {
      console.log(listedPlanets);
      // Below this comment call the appropriate helper functions
      // to pick a planet fom the list of planets and add that
      // information to your destination.
      let selectedPlanet = listedPlanets[pickPlanet(listedPlanets)];

      addDestinationInfo(
        document,
        selectedPlanet.name,
        selectedPlanet.diameter,
        selectedPlanet.star,
        selectedPlanet.distance,
        selectedPlanet.moons,
        selectedPlanet.image
      );
    });
});
