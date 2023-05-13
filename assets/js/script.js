// API key
var apiKey = "";
var apiURL =
  "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";

// DOM Elements
var cityNameInput = document.getElementById("city-name");
var searchForm = document.querySelector("form");
var currentWeather = document.getElementById("current-day");
var forecastSection = document.getElementById("forecast");
var searchHistory = document.getElementById("search-history");

// Event Listener
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const cityName = cityNameInput.value.trim();
  if (cityName) {
    getCurrentDayForcast(cityName);
    getFiveDayForecast(cityName);
  }
});

// search weather function
function getCurrentDayForcast(city) {
  var apiKey = getApiKey();
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=" +
    apiKey;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(function (data) {
      showCurrentWeather(data);
      addToSearchHistory(data.name);
    })
    .catch(function (error) {
      console.error("There was a problem fetching weather data: ", error);
      showError("There was a problem fetching weather data. Please try again.");
    });
}

function getFiveDayForecast(city) {
  var apiKey = getApiKey();
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=metric&appid=" +
    apiKey;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(function (data) {
      showFiveDayForecast(data);
    })
    .catch(function (error) {
      console.error("There was a problem fetching weather data: ", error);
      showError("There was a problem fetching weather data. Please try again.");
    });
}

// function to retrieve API for searchWeather
function getApiKey() {
  var apiKey = localStorage.getItem("openWeatherMapAPIKey");
  if (!apiKey) {
    apiKey = "api needed";
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
  var tempFahrenheit = (tempCelsius * 9) / 5 + 32;
  var wind = list.wind.speed;
  var humidity = list.main.humidity;

  var weatherHTML = `
  <div class="card">
    <div class="card-body">
    <h3>${cityNameInput}</h3>
    <p>${currentDate}<p>
    <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="weather icon">
    <p>Temp: ${tempFahrenheit.toFixed(1)} &deg;F</p>
    <p>Wind: ${wind} MPH</p>
    <p>Humidity: ${humidity} %<p>
    </div>
  </div>
  `;

  currentWeather.innerHTML = weatherHTML;
}

function showFiveDayForecast(list) {
  var forecastHTML = "";

  for (var i = 0; i < list.list.length; i++) {
    var forecast = list.list[i];
    var date = forecast.dt_txt.split(" ")[0];
    var time = forecast.dt_txt.split(" ")[1];
    var hour = time.split(":")[0];
    var temp = forecast.main.temp;
    var humidity = forecast.main.humidity;
    var weatherIcon = forecast.weather[0].icon;

    if (time === "15:00:00") {
      forecastHTML += `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${date}</h5>
              <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="weather icon">
              <p class="card-text">Temp: ${temp} &deg;F</p>
              <p class="card-text">Humidity: ${humidity} %</p>
            </div>
          </div>
      `;
    }
  }

  forecastSection.innerHTML = forecastHTML;
}

function addToSearchHistory(cityName) {
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  cityName = cityName.trim();
  if (cityName) {
    if (searchHistory.includes(cityName)) {
      var index = searchHistory.indexOf(cityName);
      searchHistory.splice(index, 1);
    }

    if (searchHistory.length > 10) {
      searchHistory.pop();
    }
    
    searchHistory.unshift(cityName);

    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    displaySearchHistory(searchHistory);
  }
}

function displaySearchHistory(searchHistory) {
  var searchHistoryList = document.getElementById("search-history-list");
  searchHistoryList.innerHTML = "";

  for (var i = 0; i < searchHistory.length; i++) {
    var listItem = document.createElement("li");
    listItem.textContent = searchHistory[i];
    searchHistoryList.appendChild(listItem);
  }
}

window.addEventListener("load", function () {
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  displaySearchHistory(searchHistory);
});
