//CURRENT DAY & HOUR
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];
  return `${day}, ${formatHours(timestamp)}`;
}

//GETTING CITY FROM SEARCH
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#cityform");
  cityElement.innerHTML = cityInput.value;
  let apiKey = "5d7a48c45799df1cd3a05ecee722cc4e";
  let units = "metric";
  let city = document.querySelector("#searchinput").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

//FORMAT HOURS
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//FORECAST BY HOURS
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 4; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-6 col-sm-3">
      <h3>${formatHours(forecast.dt * 1000)}</h3>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" >
      <div class="weather-forecast-temperature">
        <strong id="mintempcelcius">${Math.round(
          forecast.main.temp_max
        )}°C | </strong id="maxtempcelcius">${Math.round(
      (forecast.main.temp_max * 9) / 5 + 32
    )}°F
      </div>
    </div>
  `;
  }
  for (let index = 0; index < 4; index++) {
    celciusmaxone = response.data.list[index].main.temp_max;
    celciusmin = response.data.list[index].main.temp_min;
  }
}

//GETTING DATA FROM THE API
function displayWeather(response) {
  document.getElementById(
    "precipitation"
  ).innerHTML = `Precipitation: ${response.data.main.humidity}%`;
  let windvar = Math.round(response.data.wind.speed);
  document.getElementById("wind").innerHTML = `| Wind: ${windvar} km/h`;
  document.getElementById("description").innerHTML =
    response.data.weather[0].main;
  document.getElementById("city").innerHTML = response.data.name;
  let degreesvar = Math.round(response.data.main.temp);
  document.getElementById("degrees").innerHTML = `${degreesvar}`;
  let today = document.querySelector("#todaydata");
  today.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celciusTemperature = response.data.main.temp;
}

//CURRENT POSITION SEARCH BUTTON
function showPosition(position) {
  let apiKey = "5d7a48c45799df1cd3a05ecee722cc4e";
  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

//FAHRENHEIT TEMP
function displayfahrenheit(event) {
  event.preventDefault();
  celciuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");

  let fahrenheittemp = (celciusTemperature * 9) / 5 + 32;
  let degreesElement = document.querySelector("#degrees");
  degreesElement.innerHTML = Math.round(fahrenheittemp);
}

//CELCIUS TEMP
function displaycelcius(event) {
  event.preventDefault();
  fahrenheitlink.classList.remove("active");
  celciuslink.classList.add("active");

  let degreesElement = document.querySelector("#degrees");
  degreesElement.innerHTML = Math.round(celciusTemperature);
}

//AUTO RETRIEVE FUNCTION FOR STARTING APP
function autoRetrievePasto() {
  let apiKey = "5d7a48c45799df1cd3a05ecee722cc4e";
  let units = `metric`;
  let city = `Pasto`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

let searchForm = document.querySelector("#cityform");
searchForm.addEventListener("submit", search);

let currentLocationButton = document.getElementById("currentbutton");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celciusTemperature = null;

let fahrenheitlink = document.querySelector("#fahrenheit");
fahrenheitlink.addEventListener("click", displayfahrenheit);

let celciuslink = document.querySelector("#celcius");
celciuslink.addEventListener("click", displaycelcius);

autoRetrievePasto();
