const weather = document.querySelector(".js-weather");

const API_KEY = 'c660f177a6da83157e2365de18c55198';
const COORDS = 'coords';

function getWeather(lat, lng){
    //fetch() 안에는 가져올 데이터가 들어가면됨. backtick(`)을 이용
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        console.log(json);
        //console.log(weather)
        weather.innerText=`온도: ${temperature} & 현재장소: ${place}`
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        //latitude: latitude,
        //longitude: longitude
        //객체의 key의 이름을 같게 저장할때는 위처럼안하고 아래처럼 가능.
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}



function handleGeoError(){
    console.log('Can`t not find location');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    }else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init()
