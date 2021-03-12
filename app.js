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
if (hour < 10) {
  hour = `0${hour}`;
}
if (mins < 10) {
  mins = `0${hour}`;
}
let heading = document.querySelector("#currentDate");
heading.innerHTML = `${today} ${hour}:${mins}`;

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
}
function titleCase(word){
    return word.toLowerCase().split(' ').map(function(letter) {
        return (letter.charAt(0).toUpperCase() + letter.slice(1));
    }).join(' ');
}
console.log(titleCase('aspen'));
//   Display weather per search query
function showWeather(response) {
  console.log(response.data);
  let cityName = response.data.name;
  let countryAbbrev = response.data.sys.country;
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let windSpeed = Math.floor(response.data.wind.speed);
  let description = response.data.weather[0].description;
  let tempFeeling = Math.round(response.data.main.feels_like);
  description = titleCase(description);
  city.innerHTML = `${cityName}, ${countryAbbrev}`;
  weatherReport.innerHTML = description;
  temp.innerHTML = temperature;
  humid.innerHTML = `Humidity: ${humidity}%`;
  wind.innerHTML = `Wind: ${windSpeed}mph`;
  feeling.innerHTML = `Feels like: ${tempFeeling}℃`;
}
// Accessing Ids from DOM
let city = document.querySelector("#city");
let searchQuery = document.querySelector("#search-input");
let weatherReport = document.querySelector("#weatherComments");
let temp = document.querySelector("#tempNum");
let humid = document.querySelector("#how-humid");
let wind = document.querySelector("#wind");
let feeling = document.querySelector("#temp-feeling");
let formOne = document.querySelector("#search-form");
formOne.addEventListener("submit", weatherHandler);

// Event call for current location
function displayCurrentWeather() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
// Call to get current location coordinates
function showPosition(position) {
  let lat = Math.round(position.coords.latitude);
  let long = Math.round(position.coords.longitude);
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiKey = "386b70f96b3e09e40aefe57eb2e44f5e";
  let unit = "metric";
  axios
    .get(`${apiURL}lat=${lat}&lon=${long}&units=${unit}&appid=${apiKey}`)
    .then(showWeather);
}

let button = document.querySelector("#currentLoc");
button.addEventListener("click", displayCurrentWeather);

// Writing calls for when location buttons are called(London, Sydney, Moscow)
function displayCityWeather(event) {
  event.preventDefault();
  
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "386b70f96b3e09e40aefe57eb2e44f5e";
  let unit = "metric";
  //  Fiddling, trying to make each default button work
  // let choice = cButton.innerHTML;
  let c = ["London", "Sydney", "Moscow"];
  if (london) {
      choice = c[0];
  } 
  else if (sydney) {
      choice = c[1];
  }
  else {
      choice = c[3];
  }
//   Passing all variables into axios
  axios
    .get(`${apiUrl}q=${choice}&units=${unit}&appid=${apiKey}`)
    .then(showWeather);

}
// let cButton = document.querySelector(".cityButton");
// cButton.addEventListener("click", displayCityWeather);
// let london = document.querySelector("#btn1");
// let sydney = document.querySelector("#btn2");
let london = document.querySelector("#btnradio1");
let sydney = document.querySelector("#btnradio2");
let moscow = document.querySelector("#btnradio3");
// moscow.addEventListener("click", displayCityWeather);
// next, adding eventlisteners

// london.addEventListener("click", displayCityWeather);
// sydney.addEventListener("click", displayCityWeather);







// Depreciated, was for past work, now replaced with showWeather
// function showCW(response) {
//   let cityName = response.data.name;
//   let countryAbbrev = response.data.sys.country;
//   let temperature = Math.round(response.data.main.temp);
//   alert(`The temperature in ${cityName}, ${countryAbbrev} is ${temperature}℃.`);
// }

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
