// function to fetch weather based on city and unit of measurement
function lookupWeather(city, unit){
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=' + unit + '&appid=123206185652e49c7ed0ac08ec374c87')
        .then((response) => response.json())
        .then((data) => appendWeather(data));
}

// function to append searched weather
function appendWeather(data){
    let cityName = data.city.name;
    let temperature = data.list[0].main.temp;
    let weatherType = data.list[0].weather[0].main;
    let humidity = data.list[0].main.humidity;
    let windSpeed = data.list[0].wind.speed;
    console.log(cityName, temperature, weatherType, humidity, windSpeed);
    console.log(data);
}

lookupWeather('Suwanee', 'Metric');
// function getApi() {
//     let requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=Suwanee&appid=123206185652e49c7ed0ac08ec374c87';


//     fetch(requestUrl)
//         .then(function (response) {
//             return response.json();
//         })
//         console.log(requestUrl);
// }

// getApi();