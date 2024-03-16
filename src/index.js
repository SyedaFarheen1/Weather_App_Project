function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperatureValue = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperatureValue;
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;
  console.log(response.data);
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Lahore");
