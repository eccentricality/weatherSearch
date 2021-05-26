let cityNameElm = document.getElementById('cityName');

// creating elements within object as array to be iterated over by weather append function
let dayContainer = [
    {
        day: '1',
        temp: document.getElementById('temperature1'),
        weatherType: document.getElementById('weatherType1'),
        humidity: document.getElementById('humidity1'),
        windSpeed: document.getElementById('windSpeed1'),
        weatherDesc: document.getElementById('weatherDescription1'),
        weatherIcon: document.getElementById('weatherIcon1')
    },
    {
        day: '2',
        temp: document.getElementById('temperature2'),
        weatherType: document.getElementById('weatherType2'),
        humidity: document.getElementById('humidity2'),
        windSpeed: document.getElementById('windSpeed2'),
        weatherDesc: document.getElementById('weatherDescription2'),
        weatherIcon: document.getElementById('weatherIcon2')
    },
    {
        day: '3',
        temp: document.getElementById('temperature3'),
        weatherType: document.getElementById('weatherType3'),
        humidity: document.getElementById('humidity3'),
        windSpeed: document.getElementById('windSpeed3'),
        weatherDesc: document.getElementById('weatherDescription3'),
        weatherIcon: document.getElementById('weatherIcon3')
    },
    {
        day: '4',
        temp: document.getElementById('temperature4'),
        weatherType: document.getElementById('weatherType4'),
        humidity: document.getElementById('humidity4'),
        windSpeed: document.getElementById('windSpeed4'),
        weatherDesc: document.getElementById('weatherDescription4'),
        weatherIcon: document.getElementById('weatherIcon4')
    },
    {
        day: '5',
        temp: document.getElementById('temperature5'),
        weatherType: document.getElementById('weatherType5'),
        humidity: document.getElementById('humidity5'),
        windSpeed: document.getElementById('windSpeed5'),
        weatherDesc: document.getElementById('weatherDescription5'),
        weatherIcon: document.getElementById('weatherIcon5')
    }
];

// function to fetch weather based on city and unit of measurement (imperial will be default)
function lookupWeather(city, unit){
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=' + unit + '&appid=123206185652e49c7ed0ac08ec374c87')
        .then((response) => response.json())
        .then((data) => appendWeather(data));
}

// function to append searched weather
function appendWeather(data){
    // variables to store relevant data to be appended to html
    let cityName = data.city.name;
    cityNameElm.innerText = cityName;
    // iterate over created array of cards to append each day to respective cards
    for(let i=0; i <= 4; ++i) {
        dayContainer[i].temp.innerText = data.list[i].main.temp + '°F';
        dayContainer[i].weatherType.innerText = data.list[i].weather[0].main;
        dayContainer[i].humidity.innerText = 'Humidity: ' + data.list[i].main.humidity + '%';
        dayContainer[i].windSpeed.innerText = data.list[i].wind.speed + 'mph';
        dayContainer[i].weatherDesc.innerText = data.list[i].weather[0].description;
        dayContainer[i].weatherIcon.src = 'https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '.png';
    }
    console.log(data);
}

lookupWeather('Suwanee', 'Imperial');