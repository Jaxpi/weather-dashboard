// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
//https://openweathermap.org/forecast5
//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={70ffb6d83e455b1b04aff1600f58923a}

var formEl = $('#search-form');
var nameInputEl = $('#city-name');
var cityListEl = $('#city-list');
var index = 0;

$(document).ready(function () {
    var latestIndex = localStorage.getItem("latestIndex");
    index = latestIndex+1;
    for(var i=0; i<latestIndex; i++){
        var loadRecent = localStorage.getItem("City"+i);
        printSearch(loadRecent);
    }
});

var printSearch = function (name) {
  var listEl = $('<li>');
  var listDetail = name;
  listEl.addClass('list-group-item').text(listDetail);
  listEl.appendTo(cityListEl);
};

var handleFormSubmit = function (event) {
  event.preventDefault();
  var nameInput = nameInputEl.val();
  if (!nameInput) {
    return;
  }
  localStorage.setItem("City"+index, nameInput);
  index++;
  localStorage.setItem("latestIndex", index);
  printSearch(nameInput);
  nameInputEl.val('');
};

formEl.on('submit', handleFormSubmit);

$( function() {
  var availableCities = [
    "city1",
    "city2",
    "city3",
    "city4",
    "city5",
  ];
  $( "#city-name" ).autocomplete({
    source: availableCities
  });
} );
