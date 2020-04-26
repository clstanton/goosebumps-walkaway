var getCityWeather = function(city) {
    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&APPID=442bae2eea7683d5465de74730b512c3";
    
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
          });
        });
    };

  getCityWeather("Austin");