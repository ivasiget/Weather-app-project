let city = "Sydney";
let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
console.log(apiUrl);

let now = new Date();
console.log(now);

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

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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

let sequence = ["st", "nd", "rd", "th"];

if (now.getDate() === 1) {
  sequence = sequence[0];
}
if (now.getDate() === 2) {
  sequence = sequence[1];
}
if (now.getDate() === 3) {
  sequence = sequence[2];
} else {
  sequence = sequence[3];
}

let date = now.getDate();
let dateElement = document.querySelector("#date");
dateElement.innerHTML = `${date}${sequence}`;

function showTemperature(response) {
  console.log(response.data);
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
}

axios.get(apiUrl).then(showTemperature);
