// Challenge 1 - Keeping time, date current
let now = new Date();
let year = now.getFullYear();
let mins = now.getMinutes();
let hour = now.getHours();
let dayIndex = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let today = days[dayIndex];
console.log(today);
let heading = document.querySelector("#currentDate");
heading.innerHTML = `${today} ${hour}:${mins}, ${year}`;

// Challenge 2
function weatherHandler(event) {
  event.preventDefault();
  //  Start for HomeWork 5
  let endpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "386b70f96b3e09e40aefe57eb2e44f5e";
  let unit = "metric";
  axios
    .get(`${endpoint}q=${searchQuery.value}&units=${unit}&appid=${apiKey}`)
    .then(showWeather);
  // if (searchQuery.value) {
  //   city.textContent = searchQuery.value;
  // } else {
  //   alert("Type in a city");
  // }
}
function showWeather(response) {
  console.log(response.data);
  let cityName = response.data.name;
  let countryAbbrev = response.data.sys.country;
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let windSpeed = Math.floor(response.data.wind.speed);
  let description = response.data.weather[0].description;
  city.innerHTML = `${cityName}, ${countryAbbrev}`;
  weatherReport.innerHTML = description;
  temp.innerHTML = temperature;
  humid.innerHTML = `Humidity: ${humidity}%`;
  wind.innerHTML = `Wind: ${windSpeed}mph`;
}
// Accessing Ids from DOM
let city = document.querySelector("#city");
let searchQuery = document.querySelector("#search-input");
let weatherReport = document.querySelector("#weatherComments");
let temp = document.querySelector("#tempNum");
let humid = document.querySelector("#how-humid");
let wind = document.querySelector("#wind");
let formOne = document.querySelector("#search-form");
formOne.addEventListener("submit", weatherHandler);

//  Bonus Homework
function displayCurrentWeather() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
// Call to get lat & long
function showPosition(position) {
  let lat = Math.round(position.coords.latitude);
  let long = Math.round(position.coords.longitude);
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiKey = "386b70f96b3e09e40aefe57eb2e44f5e";
  let unit = "metric";
  axios
    .get(`${apiURL}lat=${lat}&lon=${long}&units=${unit}&appid=${apiKey}`)
    .then(showCW);
}
function showCW(response) {
  let cityName = response.data.name;
  let countryAbbrev = response.data.sys.country;
  let temperature = Math.round(response.data.main.temp);
  alert(`The temperature in ${cityName}, ${countryAbbrev} is ${temperature}℃.`);
}
let button = document.querySelector("#currentLoc");
button.addEventListener("click", displayCurrentWeather);

// // Old Challenge 3
// let temp = document.querySelector(".num");
// let fakeTemp = 6;
// function displayFahrTemperature() {
//   let newTemp = Math.round((fakeTemp * 9) / 5 + 32);
//   temp.innerHTML = newTemp;
//   return newTemp;
// }
// function displayCelsTemperature() {
//   let oldTemp = displayFahrTemperature();
//   let result = Math.floor(((oldTemp - 32) * 5) / 9);
//   console.log(oldTemp);
//   temp.innerHTML = result;
// }
// let celsTemp = document.querySelector("#celsius");
// let fahrenTemp = document.querySelector("#fahrenheit");
// celsTemp.addEventListener("click", displayCelsTemperature);
// fahrenTemp.addEventListener("click", displayFahrTemperature);
