var weatherContainerEl = document.querySelector("#weather-container");
var weatherSearchTerm = document.querySelector("#weather-search-term");
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");

var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input element
    var cityname = cityInputEl.value.trim();

    if (cityname) {
        getWeather(cityname) && getForecast(cityname);
        cityInputEl.value = "";

      } else {
        alert("Please enter a city name!");
      }

    console.log(event);
  };

var getWeather = function(city) {
    // format the github api url
    var apiUrlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=442bae2eea7683d5465de74730b512c3";
    var apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=442bae2eea7683d5465de74730b512c3";

    // make a request to the url (help from https://gomakethings.com/waiting-for-multiple-all-api-responses-to-complete-with-the-vanilla-js-promise.all-method/)
    Promise.all([
        fetch(apiUrlWeather),
        fetch(apiUrlForecast)
    ])
        .then(function (responses) {
		    // Get a JSON object from each of the responses
		    return responses.map(function (response) {
			    return response.json();
		    });
	    }).then(function (data) {
		    // Log the data to the console
		    // You would do something with both sets of data here
 		    console.log(data);
        }).catch(function (error) {
		    // if there's an error, log it
		    console.log(error);
        });
    }

cityFormEl.addEventListener("submit", formSubmitHandler);