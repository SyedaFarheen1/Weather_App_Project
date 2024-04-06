function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperatureValue = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperatureValue;

  let descriptionElement = document.querySelector("#description");
  let weatherDescription = response.data.condition.description;
  descriptionElement.innerHTML = weatherDescription;

  let humidityElement = document.querySelector("#humidity");
  let weatherHumidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `${weatherHumidity}%`;

  let windElement = document.querySelector("#wind");
  let weatherWind = response.data.wind.speed;
  windElement.innerHTML = `${weatherWind} km/h`;

  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);

  let weatherIconElement = document.querySelector("#icon");
  let iconURL = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  weatherIconElement.innerHTML = iconURL;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "c05b04e4f40569o3afc5dtd0fd13122d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function displayForecast() {
  let days = [`Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="row">
            <div class="column">
              <div class="weather-forecast-date">${day}</div>
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"
                alt=""
                width="50"
              />
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">18° </span>
                <span class="weather-forecast-temperature-min"> / 12°</span>
              </div>
            </div>
          </div>
`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Lahore");
displayForecast();
