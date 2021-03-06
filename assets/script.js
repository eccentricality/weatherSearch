const searchButtonElm = document.getElementById('searchBtnListener');
const searchBarInputElm = document.getElementById('searchBarInput');
const searchHistoryElm = document.getElementById('searchHistory');

let cityNameElm = document.getElementById('cityName');

// creating elements within object as array to be iterated over by weather append function
let dayContainer = [
    {
        day: document.getElementById('day1'),
        temp: document.getElementById('temperature1'),
        weatherType: document.getElementById('weatherType1'),
        humidity: document.getElementById('humidity1'),
        windSpeed: document.getElementById('windSpeed1'),
        cityUvi: document.getElementById('cityUvi1'),
        uvColor: document.getElementById('uvColor1'),
        weatherIcon: document.getElementById('weatherIcon1')
    },
    {
        day: document.getElementById('day2'),
        temp: document.getElementById('temperature2'),
        weatherType: document.getElementById('weatherType2'),
        humidity: document.getElementById('humidity2'),
        windSpeed: document.getElementById('windSpeed2'),
        cityUvi: document.getElementById('cityUvi2'),
        uvColor: document.getElementById('uvColor2'),
        weatherIcon: document.getElementById('weatherIcon2')
    },
    {
        day: document.getElementById('day3'),
        temp: document.getElementById('temperature3'),
        weatherType: document.getElementById('weatherType3'),
        humidity: document.getElementById('humidity3'),
        windSpeed: document.getElementById('windSpeed3'),
        cityUvi: document.getElementById('cityUvi3'),
        uvColor: document.getElementById('uvColor3'),
        weatherIcon: document.getElementById('weatherIcon3')
    },
    {
        day: document.getElementById('day4'),
        temp: document.getElementById('temperature4'),
        weatherType: document.getElementById('weatherType4'),
        humidity: document.getElementById('humidity4'),
        windSpeed: document.getElementById('windSpeed4'),
        cityUvi: document.getElementById('cityUvi4'),
        uvColor: document.getElementById('uvColor4'),
        weatherIcon: document.getElementById('weatherIcon4')
    },
    {
        day: document.getElementById('day5'),
        temp: document.getElementById('temperature5'),
        weatherType: document.getElementById('weatherType5'),
        humidity: document.getElementById('humidity5'),
        windSpeed: document.getElementById('windSpeed5'),
        cityUvi: document.getElementById('cityUvi5'),
        uvColor: document.getElementById('uvColor5'),
        weatherIcon: document.getElementById('weatherIcon5')
    }
];

// designate starting day as today
let today = new Date().getDay();
dayContainer[0].day.innerText = 'Today';

// days of the week container accounts for starting on saturday as index 6 before being reset to sunday today index 0
let daysOfTheWeek = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday',
    8: 'Monday',
    9: 'Tuesday',
    10: 'Wednesday'
}

// display days of the week depending on what day today is
for (let i = 1; i <= 4; i++) {
    dayContainer[i].day.innerText = daysOfTheWeek[today + i];
}

// function to fetch weather based on city and unit of measurement (imperial will be default)
function lookupWeather(city){
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=123206185652e49c7ed0ac08ec374c87')
        .then((response) => response.json())
        .then((data) => appendWeather(data));
}

// defaulted to greenwich and appends history if it exists on load
lookupWeather('Greenwich');

// function to append searched weather
function appendWeather(data){
    // variables to store relevant data to be appended to html
    let cityName = data.city.name;
    cityNameElm.innerText = cityName;

    let cityLat = data.city.coord.lat;
    let cityLon = data.city.coord.lon;

    lookupUvi(cityLat, cityLon);

    // iterate over created array of cards to append each day to respective cards
    for(let i=0; i <= 4; ++i) {
        dayContainer[i].temp.innerText = data.list[i].main.temp + '??F';
        dayContainer[i].weatherType.innerText = data.list[i].weather[0].main;
        dayContainer[i].humidity.innerText = 'Humidity: ' + data.list[i].main.humidity + '%';
        dayContainer[i].windSpeed.innerText = 'Wind: ' + data.list[i].wind.speed + 'mph';
        dayContainer[i].weatherIcon.src = 'https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '.png';
    }
}

function lookupUvi(lat, lon){
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=current,minutely,hourly,alerts&units=imperial&appid=123206185652e49c7ed0ac08ec374c87')
    .then((response) => response.json())
    .then((data) => appendUvi(data));
}

function appendUvi(data){
    console.log(data)
    
    // iterates and appends uvi separately since it's not in 5 day forecast api
    for(let i=0; i <= 4; ++i) {
        dayContainer[i].cityUvi.innerText = 'UV Index: ' + data.daily[i].uvi;

        // changes color of uv container depending on severity of the uv index
        if (data.daily[i].uvi >= 0 && data.daily[i].uvi <= 2) {
            dayContainer[i].uvColor.style.backgroundColor = '#58CF90';
        }
        else if (data.daily[i].uvi >= 3 && data.daily[i].uvi <= 7) {
            dayContainer[i].uvColor.style.backgroundColor = '#E2E85E';
        }
        else {
            dayContainer[i].uvColor.style.backgroundColor = '#FC4949';
        }
    }
}

// function to search input city
function searchInput(){
    this.lookupWeather(searchBarInputElm.value);
}

// click function to grab input from search bar
searchButtonElm.addEventListener('click', function(event) {
    event.preventDefault();

    searchInput();
    recallHistory();
    shortenHistory();
    searchBarInputElm.value = '';
});

searchBarInputElm.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        
        searchInput();
        recallHistory();
        shortenHistory();
        searchBarInputElm.value = '';
    }
});

// jquery to handle floating history list of cities searched
$(document).ready(function() {
    // starts off hidden
    $('#searchHistory').hide();

    // show on focus for mobile port
    $('#searchBarInput').on('focus', function() {
        $('#searchHistory').show();
    });

    // various show and hide on hover for input box as well as ul itself
    $('#searchBarInput').hover(function() {
        $('#searchHistory').show();
    });

    $('#searchHistory').hover(function() {
        $('#searchHistory').show();
    });

    $('#searchBarInput').mouseleave(function() {
        $('#searchHistory').hide();
    })

    $('#searchHistory').mouseleave(function() {
        $('#searchHistory').hide();
    })

    // click handles searchInput to automatically populate previous city clicked and search while handling style to toggle back
    $('#searchHistory').on('click', 'li', function(e) {
        e.preventDefault();
        let textInfo = $(this).text();
        $('#searchBarInput').val(textInfo);
        searchInput();
        recallHistory();
        shortenHistory();
        searchBarInputElm.value = '';
        $('#searchHistory').toggle();
    })
})

function recallHistory() {
    let localSearchHistory = JSON.parse(localStorage.getItem('localStoredHistory')) || [];
    let searchedCity = searchBarInputElm.value;


    localSearchHistory.push(searchedCity);

    searchHistoryElm.innerText = '';

    for (let i = localSearchHistory.length - 1; i >=0; i--) {
        let li = document.createElement('li');

        li.appendChild(document.createTextNode(localSearchHistory[i]));
        searchHistoryElm.appendChild(li);
    }

    localStorage.setItem('localStoredHistory', JSON.stringify(localSearchHistory));
}

// shorten history list and keeps it to 6 max
function shortenHistory() {
    let localSearchHistory = JSON.parse(localStorage.getItem('localStoredHistory')) || [];

    if (localSearchHistory.length > 5) {
        localSearchHistory.shift();
    }
    localStorage.setItem('localStoredHistory', JSON.stringify(localSearchHistory));
}