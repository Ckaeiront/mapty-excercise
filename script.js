"use strict";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

// var map, mev;

class App {
  #map;
  #mev;
  constructor() {
    this._getCurrentLocation();
    this._showForm();
  }

  _getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
        return alert('could not get your location');
      });
    }
  }

  _loadMap(location) {
    console.log(location);
    const { latitude, longitude } = location.coords;
    const coords = [latitude, longitude];
    this.#map = L.map("map").setView(coords, 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.#map);
  }

  _showForm() {
    this.#map.on("click", function (mevent) {
      this.#mev = mevent;
      form.classList.remove("hidden");
      inputDistance.focus();
    });
  }

  _toggleElevationView() {
    inputType.addEventListener("change", function () {
      // closest parent
      inputElevation
        .closest(".form__row")
        .classList.toggle("form__row--hidden");
      input
      Cadence.closest(".form__row").classList.toggle("form__row--hidden");
    });
  }

  _newWorkout() {}
}

const app = new App();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // clear all fields
  inputCadence.value =
    inputDistance.value =
    inputDuration.value =
    inputElevation.value =
      "";

  let { lat, lng } = mev.latlng;
  let clickCoordsArray = [lat, lng];
  L.marker(clickCoordsArray)
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        className: "running-popup",
      })
    )
    .setPopupContent("emacs vim")
    .openPopup();
});

class Workout {
  constructor() {}
}

class Running extends Workout {}

class Cycling extends Workout {}
