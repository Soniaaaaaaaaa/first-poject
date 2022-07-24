let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let now = new Date();
let min = now.getMinutes();
if (min < 10) {
  min = "0" + now.getMinutes();
}
let data = document.querySelector("span");
data.innerHTML = `${days[now.getDay()]}, ${now.getHours()}:${min}`;
let form = document.querySelector("#form");
let cityName = document.querySelector(".form-city");
let city = document.querySelector("#city");
let apiKey = "c7c6539392c3a4c5e33e163fd7a6488d";
let url = "https://api.openweathermap.org/data/2.5/weather?";
let degree = document.querySelector("#degree");
let hum = document.querySelector("#ch-2");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  axios
    .get(`${url}q=${cityName.value}&units=metric&appid=${apiKey}`)
    .then(showTempAndCityAndHum);
});
let degreeType = document.querySelector("#degree-type");
degree.addEventListener("click", function () {
  if (degree.innerHTML !== " ") {
    if (degreeType.innerHTML === "°C") {
      degree.innerHTML = degree.innerHTML * 1.8 + 32;
      degreeType.innerHTML = "°F";
    } else {
      degree.innerHTML = (degree.innerHTML - 32) / 1.8;
      degreeType.innerHTML = "°C";
    }
  }
});
function showTempAndCityAndHum(response) {
  degree.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = `${response.data.name}`;
  hum.innerHTML = `${response.data.main.humidity}`;
}
function showPosition(position) {
  let link = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(link).then(showTempAndCityAndHum);
}
let lastBtn = document.querySelector("#last_btn");
lastBtn.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(showPosition);
});
