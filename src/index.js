let city = "Sydney";

let now = new Date();

let hour = now.getHours();
let minutes = now.getMinutes();
let timeElement = document.querySelector("#time");
if (hour < 10) {
  hour = `0${hour}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
timeElement.innerHTML = `${hour}:${minutes}`;

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let dayElement = document.querySelector("#day");
dayElement.innerHTML = day;

let months = [
  "January",
  "February",
  "March",
  "May",
  "April",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let monthElement = document.querySelector("#month");
monthElement.innerHTML = month;

let date = now.getDate();
let dateElement = document.querySelector("#date");

let sequence = ["st", "nd", "rd", "th"];
let sequenceElement = "";

if (date === 1) {
  sequenceElement = sequence[0];
}
if (date === 2) {
  sequenceElement = sequence[1];
}
if (date === 3) {
  sequenceElement = sequence[2];
}
if (date > 3) {
  sequenceElement = sequence[3];
}

dateElement.innerHTML = `${date}${sequenceElement}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function search(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputElement = document.querySelector("#input");
  search(inputElement.value);
}

search("Krapina");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  return days[day];
}

function getForecast(coordinates) {
  let lon = coordinates.lon;
  let lat = coordinates.lat;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast-section");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="dayForecast" id="dayForecast">${formatDay(
                forecastDay.dt
              )}</div>
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="45"
              />
              <div class="tempForecast">
                <span class="hiTempForecast" id="hiTempForecast">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="lowTempForecast" id="lowTempForecast">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(`#temperature`);
  temperatureElement.innerHTML = temperature;

  let city = response.data.name;
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = city;

  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = description;

  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsLikeElement = document.querySelector("#feelsLike");
  feelsLikeElement.innerHTML = feelsLike;

  let lowTemp = Math.round(response.data.main.temp_min);
  let lowTempElement = document.querySelector("#lowTemp");
  lowTempElement.innerHTML = lowTemp;

  let hiTemp = Math.round(response.data.main.temp_max);
  let hiTempElement = document.querySelector("#hiTemp");
  hiTempElement.innerHTML = hiTemp;

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

let button = document.querySelector("#button");
button.addEventListener("click", getCurrentPosition);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

/*function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("notActive");
  fahrenheitLink.classList.add("notActive");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("notActive");
  celsiusLink.classList.add("notActive");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

/*let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;
*/
