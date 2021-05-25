
function getApi() {
    let requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=Suwanee&appid=123206185652e49c7ed0ac08ec374c87';


    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        console.log(requestUrl);
}

getApi();