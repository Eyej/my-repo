// Date from weather api
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let dayIndex = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return day + " " + formatHour(timestamp);
}
// same as above, but specifically for hours
function formatHour(timestamp) {
  let now = new Date(timestamp);
  let mins = now.getMinutes();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (mins < 10) {
    mins = `0${mins}`;
  }
  return `${hour}:${mins}`;
}

// 5 day forecast call
function displayForecast(response) {
  console.log(response.data);
  // Setting initial vars to 'null' so it refreshes before each call
  let forecast = null;
  let forecastElement = document.querySelector("#forecastNode");
  forecastElement.innerHTML = null;

  // Using for loop to display 5-day weather forecast
  for (let i = 2; i < 40; i += 8) {
    forecast = response.data.list[i];
    forecastElement.innerHTML += `<div class="col-2 daytemp">
      <small>${formatHour(forecast.dt * 1000)}</small>
      <h6>${formatDate(forecast.dt * 1000).slice(0, 3)}</h6>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }.png" 
      alt=${forecast.weather[0].description} />
      <div class ="secondary-temp">
          <strong id="temp-max">
            ${Math.round(forecast.main.temp)}°
          </strong> &nbsp;
          <span id="temp-min">${Math.round(forecast.main.temp_min)}°</span> 
      </div>
    </div>`;
  }
}

// API call to get desired weather and forecast
function weatherHandler(event) {
  event.preventDefault();
  // declaring api variables
  let endpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "386b70f96b3e09e40aefe57eb2e44f5e";
  let unit = "metric";
  axios
    .get(`${endpoint}q=${searchQuery.value}&units=${unit}&appid=${apiKey}`)
    .then(showWeather);

  // forecast call
  let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?";
  axios
    .get(`${apiUrl}q=${searchQuery.value}&units=${unit}&appid=${apiKey}`)
    .then(displayForecast);
}
// Capitilize first word of any string
function titleCase(word) {
  return word
    .toLowerCase()
    .split(" ")
    .map(function (letter) {
      return letter.charAt(0).toUpperCase() + letter.slice(1);
    })
    .join(" ");
}

//  Display weather per search query
function showWeather(response) {
  let cityName = response.data.name;
  let countryAbbrev = response.data.sys.country;
  celsiusTemp = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let windSpeed = Math.floor(response.data.wind.speed);
  let description = response.data.weather[0].description;
  let tempFeeling = Math.round(response.data.main.feels_like);
  let icon = response.data.weather[0].icon;

  description = titleCase(description);
  city.innerHTML = `${cityName}, ${countryAbbrev}`;
  weatherReport.innerHTML = description;
  temp.innerHTML = celsiusTemp;
  humid.innerHTML = `Humidity: ${humidity}%`;
  wind.innerHTML = `Wind: ${windSpeed}mph`;
  feeling.innerHTML = `Feels like: ${tempFeeling}°`;
  let heading = document.querySelector("#currentDate");
  heading.innerHTML = `Last updated: ${formatDate(response.data.dt * 1000)}`;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", description);
}
// making celsiusTemp a global var
let celsiusTemp = null;
// Accessing elements by ids in DOM
let city = document.querySelector("#city");
let searchQuery = document.querySelector("#search-input");
let weatherReport = document.querySelector("#weatherComments");
let temp = document.querySelector("#tempNum");
let humid = document.querySelector("#how-humid");
let wind = document.querySelector("#wind");
let feeling = document.querySelector("#temp-feeling");
let weatherIcon = document.querySelector("#weather-icon");
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
  // forecast call
  apiURL = "https://api.openweathermap.org/data/2.5/forecast?";
  axios
    .get(`${apiURL}lat=${lat}&lon=${long}&units=${unit}&appid=${apiKey}`)
    .then(displayForecast);
}

let mapButton = document.querySelector("#currentLoc");
mapButton.addEventListener("click", displayCurrentWeather);

// Writing calls for when location buttons are called(London, Sydney, Moscow)
function displayCityWeather(event) {
  event.preventDefault();
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "386b70f96b3e09e40aefe57eb2e44f5e";
  let unit = "metric";

  // Just like getting a form value, this gets each city's innertext
  let choice = event.target.innerText;
  //   Passing all variables into axios
  axios
    .get(`${apiUrl}q=${choice}&units=${unit}&appid=${apiKey}`)
    .then(showWeather);

  // forecast call
  apiUrl = "https://api.openweathermap.org/data/2.5/forecast?";
  axios
    .get(`${apiUrl}q=${choice}&units=${unit}&appid=${apiKey}`)
    .then(displayForecast);
}

let london = document.querySelector("#btn1");
let sydney = document.querySelector("#btn2");
let moscow = document.querySelector("#btn3");

// next, adding eventlisteners
london.addEventListener("click", displayCityWeather);
sydney.addEventListener("click", displayCityWeather);
moscow.addEventListener("click", displayCityWeather);

// Creating the temp converter
function convertToFahrenheit(event) {
  event.preventDefault();
  // remove active class from Celsius link and add to F-link when temp switches to fahrenheit
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temp.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
}
function convertToCelsius(event) {
  event.preventDefault();
  // Added back the active class
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temp.innerHTML = celsiusTemp;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
