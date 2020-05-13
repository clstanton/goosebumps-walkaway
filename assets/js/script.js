// global variables
var apiKey = "442bae2eea7683d5465de74730b512c3";
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-name");
var todaysWeatherData = document.querySelector("#todays-weather-data");
var citySearchTerm = document.querySelector("#city-search-term");
var todayListGroup = document.querySelector("#today-list-group");
var todayTemp = document.querySelector("#today-temp");
var todayHumidity = document.querySelector("#today-humidity");
var todayWind = document.querySelector("#today-wind");
var todayUv = document.querySelector("#today-uv");
// var searchedArr = JSON.parse(localStorage.getItem("searchedItems")) || [];
// let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    // console.log(searchHistory);

// today's date
(function() {
  var now = moment().format("(l)");
  var displayMoment = document.getElementById('todaysDate');
  displayMoment.innerHTML = now;

  console.log(now);
})();

// to be executed upon a form submission browser event
var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        getCityWeather(city);
        cityInputEl.value = "";
      } else {
        alert("Please enter a city name!");
      }

    console.log(event);
  };

// search for city weather from api
var getCityWeather = function(city) {
    // format the api url
    var apiUrlToday = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey;
    var apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey;

    // make a request to the url
    fetch(apiUrlToday)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
          displayWeather(response, city);
      })
      .catch (function(error) {
        console.log(error);
      });

    // make a request to the url
    fetch(apiUrlForecast)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        displayWeather(response, city);
      })
      .catch (function(error) {
        console.log(error);
      });
    };
    
// search for city weather from api
//var getForecastWeather = function(city) {
  
  //};

var displayWeather = function(response, searchTerm) {
  // clear old content
  citySearchTerm.textContent = searchTerm;

  todayTemp.innerHTML = "Temperature: " + (response.main.temp);
  todayHumidity.innerHTML = "Humidity: " + (response.main.humidity)+"%";
  todayWind.innerHTML = "Wind Speed: " + (response.wind.speed) + " MPH";
  todayUv.innerHTML = "UV Index: ";

  var forecastSubtitle = document.querySelector("#forecast-subtitle");
  forecastSubtitle.innerHTML = "5-Day Forecast:";
  var forecastDate = document.querySelector(".forecast-date");
  var forecastIcon = document.querySelector(".forecast-icon");
  var forecastTemp = document.querySelector(".forecast-temp");
  var forecastHumidity = document.querySelector(".forecast-humidity");
  var forecastEl = document.querySelector("#forecast-weather-data");
  for (var i=0; i<forecastEl.length; i++) {
      forecastEl[i].innerHTML = "";
      var forecastIndex = i*8 + 4;
      forecastDate.innerHTML = "Date: " + (response.list[forecastIndex].dt)
      forecastTemp.innerHTML = "Temp: " + (response.list[forecastIndex].main.temp) +" &#176F";
        forecastEl[i].append(forecastTemp);
      forecastHumidity.innerHTML = "Humidity: " + (response.list[forecastIndex].main.humidity + "%");
        forecastEl[i].append(forecastHumidity);
    }

  console.log(searchTerm);
  console.log(response);
}

cityFormEl.addEventListener("submit", formSubmitHandler);