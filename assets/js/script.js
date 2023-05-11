// APU key 
var apiKey = '';
var apiURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'

// DOM Elements
var cityName = document.getElementById('city-name');
var searchForm = document.querySelector('form');
var currentWeather = document.getElementById('current-weather');
var forecastSection = document.getElementById('forecast');
var searchHistory = document.getElementById('search-history');

// Event Listener
searchForm.addEventListener('submit');
