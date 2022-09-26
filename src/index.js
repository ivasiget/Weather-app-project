let city = "Dublin";
let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
console.log(apiUrl);

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
}

axios.get(apiUrl).then(showTemperature);
