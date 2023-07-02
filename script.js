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

var map, mev;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (location) {
      const { latitude, longitude } = location.coords;
      const coords = [latitude, longitude];

      map = L.map("map").setView(coords, 13);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

      map.on("click", function (mevent) {
        mev = mevent;
        form.classList.remove("hidden");
        inputDistance.focus();
      });
    },
    function (params) {
      console.log("fodase " + params);
    }
  );
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
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
