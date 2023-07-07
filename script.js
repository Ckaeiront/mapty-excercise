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

class Workout {
  date = new Date();
  id = (new Date() + "").slice(-10);

  constructor(distance, duration, coords) {
    this.distance = distance; // in km
    this.duration = duration; // in min
    this.coords = coords;
  }
}

class Running extends Workout {
  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
  
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(distance, duration, coords, elevationGain) {
    super(distance, duration, coords);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

class App {
  #map;
  #mev;
  constructor() {
    this._getCurrentLocation();
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationView.bind(this));
  }

  _getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () =>
        alert("could not get your location")
      );
    }
  }

  _loadMap(location) {
    console.log(location);
    const { latitude, longitude } = location.coords;
    const coords = [latitude, longitude];
    this.#map = L.map("map").setView(coords, 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      this.#map
    );

    this.#map.on("click", this._showForm.bind(this));
  }

  _showForm(mevent) {
    this.#mev = mevent;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _toggleElevationView() {
    // closest parent
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    Cadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    e.preventDefault();

    // clear all fields
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        "";

    let { lat, lng } = this.#mev.latlng;
    let clickCoordsArray = [lat, lng];
    L.marker(clickCoordsArray)
      .addTo(this.#map)
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
  }
}

const app = new App();
