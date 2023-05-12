// API key 
var apiKey = '';
var apiURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'

// DOM Elements
var cityNameInput = document.getElementById('city-name');
var searchForm = document.querySelector('form');
var currentWeather = document.getElementById('current-day');
var forecastSection = document.getElementById('forecast');
var searchHistory = document.getElementById('search-history');

// Event Listener
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const cityName = cityNameInput.value.trim();
    if (cityName) {
      searchWeather(cityName);
    }
  });

// search weather function
  function searchWeather(city) {
    var apiKey = getApiKey();
    var apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      apiKey;
  
    fetch(apiUrl)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(function(data) {
        showCurrentWeather(data);
      })
      .catch(function(error) {
        console.error("There was a problem fetching weather data: ", error);
        showError("There was a problem fetching weather data. Please try again.");
      });
  }
// function to retrieve API for searchWeather
  function getApiKey() {
    var apiKey = localStorage.getItem('openWeatherMapAPIKey');
    if (!apiKey) {
      apiKey = 'api needed';
    }
  
    return apiKey;
  }

//   function to retrive specific info for searchWeather function
function showCurrentWeather(list) {
    var cityNameInput = list.name;
    var currentDate = dayjs().format("MM/DD/YY");
    $("#current-day").text(currentDate);
    var weatherIcon = list.weather[0].icon;
    var tempCelsius = list.main.temp;
    var tempFahrenheit = (tempCelsius * 9/5) + 32;
    var wind = list.wind.speed;
    var humidity = list.main.humidity;
  
    var weatherHTML = `
    <h3>${cityNameInput}</h3>
    <p>${currentDate}<p>
    <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="weather icon">
    <p>Temp: ${tempFahrenheit.toFixed(1)} &deg;F</p>
    <p>Wind: ${wind} MPH</p>
    <p>Humidity: ${humidity} %<p>
  `;

    currentWeather.innerHTML = weatherHTML;
  }