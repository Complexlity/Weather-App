import {getRequest, getGif} from './functions.js'

let dq = document.querySelector.bind(document)
let dqa = document.querySelectorAll.bind(document)
let c = console.log.bind(document)

let root = dq(':root')

let search = dqa('[data-search]')
let cityName = dq('[data-cityName]')
let time = dq('[data-time]')
let temperature = dq('[data-temperature]')
let weather = dq('[data-weather]')
let windPressure = dq('[data-windPressure]')
let windSpeed = dq('[data-windSpeed]')
let humidity = dq('[data-humidity]')
let weatherIcon = dq('[data-weatherIcon]')
let gif = dq('[data-gif]')


  loadSite('somerset')


async function loadSite(cityName){
    let weatherData = await getRequest(cityName)
    let backgroundGif = await getGif(weatherData[1])
    let data = [weatherData, backgroundGif]
    updatePage(data)
}


function updatePage(data){
    let weatherData = data[0]
    let backgroundGif = data[1]
    data = weatherData[0]
    let iconCode = data.weather[0].icon
    let today = new Date()
    let backgroundImage;
    let textColor;
    let weatherArray = ['rain', 'clouds', 'clear', 'mist']
    let weatherName = weatherData[1].toLowerCase()
    backgroundImage = `url('../assets/${weatherName}.jpg')`
    if(!(weatherArray.includes(weatherName))) backgroundImage = '#111827'
    root.style.setProperty('--bg-image', backgroundImage)
   
    cityName.innerHTML = data.name;
    time.innerHTML = `Today ${today.getHours()}:${today.getMinutes()}`
    temperature.innerHTML = Math.round((data.main.temp-273.15)*10)/10 + "°";
    weatherIcon.src = "http://openweathermap.org/img/w/" + iconCode + ".png"
    weatherIcon.style.display = 'inline-block'
    weather.innerHTML = weatherData[1]
    windPressure.innerHTML = data.main.pressure + 'hpa'
    humidity.innerHTML = data.main.humidity + '%'
    windSpeed.innerHTML = data.wind.speed + 'm/s'
    gif.src = backgroundGif
    //   document.getElementById("location").innerHTML = data.name;
    //   document.getElementById("description").innerHTML = data.weather[0].description;
    //   document.getElementById("data_temperature").innerHTML = Math.round((data.main.temp-273.15)*10)/10 + "°C";
    //   document.getElementById("data_humidity").innerHTML = data.main.humidity + "%";
    //   document.getElementById("data_wind_speed").innerHTML = data.wind.speed + "m/s";
    //   document.getElementById("data_wind_direction").innerHTML = data.wind.deg + "º";
    //   document.getElementById("data_pressure").innerHTML = data.main.pressure + "hPa";
    //   document.getElementById("data_sunset").innerHTML = new Date(data.sys.sunset*1000).toLocaleTimeString();
    // ;


  }