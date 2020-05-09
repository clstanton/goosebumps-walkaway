// global variables
var apiKey = "442bae2eea7683d5465de74730b512c3";
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-name");
var todaysWeatherData = document.querySelector("#todays-weather-data");
var citySearchTerm = document.querySelector("#city-search-term");
// var searchedArr = JSON.parse(localStorage.getItem("searchedItems")) || [];
// let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    // console.log(searchHistory);

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
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
          displayWeather(data, city);
          });
        });
};
  
// today's date
(function() {
  var now = moment().format("(l)");
  var displayMoment = document.getElementById('todaysDate');
  displayMoment.innerHTML = now;

  console.log(now);
})();

var displayWeather = function(weather, searchTerm) {
  // clear old content
  todaysWeatherData.textContent = "";
  citySearchTerm.textContent = searchTerm;

  console.log(weather);
  console.log(searchTerm);
}

cityFormEl.addEventListener("submit", formSubmitHandler);