// Date from weather api
function formatDate(timestamp) {
  let now = new Date(timestamp);
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
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (mins < 10) {
    mins = `0${mins}`;
  }
return `${today} ${hour}:${mins}`;
}
// 5 day forecast call
function displayForecast(response) {
  console.log(response.data);
  // Response variables
  let forecast = response.data.list;
  let dayOne = formatDate(forecast[2].dt * 1000);
  let shorthand1 = dayOne.slice(0, 3);
  let icon1 = forecast[2].weather[0].icon;
  let tempMax = Math.round(forecast[2].main.temp);
  let tempMin = Math.round(forecast[2].main.temp_min);
  console.log(dayOne);

  let forecastElement = document.querySelector("#forecastNode");
  forecastElement.innerHTML = 
  `<div class="col-2 daytemp">
      <h6 class="">${shorthand1}</h6>
      <img src="media/cloudySunny.JPG" alt=${forecast[2].weather[0].description} id="fIcon1" class="smallpic" />
      <div class ="secondary-temp">
          <strong id="temp-max">
            ${tempMax}°
          </strong> &nbsp;
          <span id="temp-min">${tempMin}°</span> 
      </div>
    </div>`;
  
 fIcon1.setAttribute("src", `http://openweathermap.org/img/wn/${icon1}.png`);
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
    axios.get(`${apiUrl}q=${searchQuery.value}&units=${unit}&appid=${apiKey}`).then(displayForecast);
}
function titleCase(word){
    return word.toLowerCase().split(' ').map(function(letter) {
        return (letter.charAt(0).toUpperCase() + letter.slice(1));
    }).join(' ');
}

//   Display weather per search query
function showWeather(response) {
  // console.log(response.data);
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
  heading.innerHTML = formatDate(response.data.dt * 1000);
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
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
}

let button = document.querySelector("#currentLoc");
button.addEventListener("click", displayCurrentWeather);

// Writing calls for when location buttons are called(London, Sydney, Moscow)
function displayCityWeather(event) {
  event.preventDefault();
  console.log(event);
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "386b70f96b3e09e40aefe57eb2e44f5e";
  let unit = "metric";
 
  let choice = event.target.innerText;
//   Passing all variables into axios
  axios
    .get(`${apiUrl}q=${choice}&units=${unit}&appid=${apiKey}`)
    .then(showWeather);

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
let fahrenheitLink= document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celsiusLink= document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);





