//Global Variables

var partQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var queryURL;
var formEl = $('#search-form');
var nameInputEl = $('#city-name');
var cityListEl = $('#city-list');
var index = 0;
var city;

//When page loads - retrieve any locally stored data

$(document).ready(function () {
  var cityArray = JSON.parse(localStorage.getItem("cityList"));
  cityArray.forEach(city =>{
    printSearch(city);
  })
});

//Create buttons for each city and put in city list

var printSearch = function (name) {
  var listEl = $('<button>');
  var listDetail = name;
  listEl.addClass('list-group-item').text(listDetail);
  listEl.attr('id', 'list-group-item');
  listEl.appendTo(cityListEl);
};

//When a city name is inputted (and is valid) then apply it to the API string for search, set it to local storage, and display data for current weather

var handleFormSubmit = function (event) {
  event.preventDefault();

  var nameInput;
  if(event.target.id === "search-form"){
    nameInput = nameInputEl.val();
  } else if (event.target.id === "list-group-item"){
    nameInput = event.target.textContent;
  }

  if (!nameInput) {
    return;
  }
  queryURL = partQueryURL + nameInput + "&appid=70ffb6d83e455b1b04aff1600f58923a";
  
  var cityList = localStorage.getItem("cityList");
  var list;
  if (cityList == null) {
    list = [nameInput];
    localStorage.setItem("cityList", JSON.stringify(list));
    printSearch(nameInput);
  } else {
    list = JSON.parse(cityList);
    var found = false;
    for(var i=0; i < list.length; i++){
      if(list[i] == nameInput){
        found = true;
      }
    }
    if(found == false){
      list.push(nameInput);
      localStorage.setItem("cityList", JSON.stringify(list))
      printSearch(nameInput);
    }
  };
  
//Use the coordinates from the previous data query to retrieve the 5-day forecast data

  nameInputEl.val('');
  var forecastQueryURL;
  fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=70ffb6d83e455b1b04aff1600f58923a";
    console.log(data);
    document.querySelector("#current-name").textContent = data.name;
    var currentDate = new Date(data.dt*1000);
    document.querySelector("#current-date").innerHTML = currentDate.getMonth()+"/"+currentDate.getDate()+"/"+currentDate.getFullYear();
    document.querySelector("#current-conditions").setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
    document.querySelector("#current-temp").textContent = "Temp: " + k2f(data.main.temp) + "\u00B0F";
    document.querySelector("#current-humidity").textContent = "Humidity: " + data.main.humidity + "%";
    document.querySelector("#current-wind").textContent = "Wind Speed: " + data.wind.speed + "mph";

    fetch(forecastQueryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var forecastDate1 = new Date(data.list[1].dt_txt);
      document.querySelector("#five-date1").innerHTML = forecastDate1.toString().substring(0,10);
      document.querySelector("#five-conditions1").setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[1].weather[0].icon + "@2x.png");
      document.querySelector("#five-temp1").textContent = "Temp: " + k2f(data.list[1].main.temp_max) + "\u00B0F";
      document.querySelector("#five-humidity1").textContent = "Humidity: " + data.list[1].main.humidity + "%";
      document.querySelector("#five-wind1").textContent = "Wind Speed: " + data.list[1].wind.speed + "mph";

      var forecastDate2 = new Date(data.list[9].dt_txt);
      document.querySelector("#five-date2").innerHTML = forecastDate2.toString().substring(0,10);
      document.querySelector("#five-conditions2").setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[9].weather[0].icon + "@2x.png");
      document.querySelector("#five-temp2").textContent = "Temp: " + k2f(data.list[9].main.temp_max) + "\u00B0F";
      document.querySelector("#five-humidity2").textContent = "Humidity: " + data.list[9].main.humidity + "%";
      document.querySelector("#five-wind2").textContent = "Wind Speed: " + data.list[9].wind.speed + "mph";

      var forecastDate3 = new Date(data.list[17].dt_txt);
      document.querySelector("#five-date3").innerHTML = forecastDate3.toString().substring(0,10);
      document.querySelector("#five-conditions3").setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[17].weather[0].icon + "@2x.png");
      document.querySelector("#five-temp3").textContent = "Temp: " + k2f(data.list[17].main.temp_max) + "\u00B0F";
      document.querySelector("#five-humidity3").textContent = "Humidity: " + data.list[17].main.humidity + "%";
      document.querySelector("#five-wind3").textContent = "Wind Speed: " + data.list[17].wind.speed + "mph";

      var forecastDate4 = new Date(data.list[25].dt_txt);
      document.querySelector("#five-date4").innerHTML = forecastDate4.toString().substring(0,10);
      document.querySelector("#five-conditions4").setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[25].weather[0].icon + "@2x.png");
      document.querySelector("#five-temp4").textContent = "Temp: " + k2f(data.list[25].main.temp_max) + "\u00B0F";
      document.querySelector("#five-humidity4").textContent = "Humidity: " + data.list[25].main.humidity + "%";
      document.querySelector("#five-wind4").textContent = "Wind Speed: " + data.list[25].wind.speed + "mph";

      var forecastDate5 = new Date(data.list[33].dt_txt);
      document.querySelector("#five-date5").innerHTML = forecastDate5.toString().substring(0,10);
      document.querySelector("#five-conditions5").setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[33].weather[0].icon + "@2x.png");
      document.querySelector("#five-temp5").textContent = "Temp: " + k2f(data.list[33].main.temp_max) + "\u00B0F";
      document.querySelector("#five-humidity5").textContent = "Humidity: " + data.list[33].main.humidity + "%";
      document.querySelector("#five-wind5").textContent = "Wind Speed: " + data.list[33].wind.speed + "mph";
    })
  })
};

//Conversion for temperature from Kelvin to Fahrenheit

function k2f(K) {
  return Math.floor((K - 273.15) * 1.8 + 32);
}

//If clicked or submitted, or if clicked on recent searches buttons, run function again

formEl.on('submit', handleFormSubmit);

cityListEl.on("click", function(event){
  handleFormSubmit(event);
});