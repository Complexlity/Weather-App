import {getRequest, getGif} from './functions.js'

let dq = document.querySelector.bind(document)
let dqa = document.querySelectorAll.bind(document)
let c = console.log.bind(document)

loadSite()

async function loadSite(){
    let cityName = prompt('Enter a city name')
    let weatherData = await getRequest(cityName)
    let backgroundGif = await getGif(weatherData[1])
    updatePage([weatherData[0], backgroundGif])        
}


async function updatePage(dataAndImage){
    let data = dataAndImage[0]
    let bgUrl = dataAndImage[1]
    document.body.style.backgroundImage = `url('${bgUrl}')`

  document.getElementById("temperature").innerHTML = Math.round((data.main.temp-273.15)*10)/10 + "°C";
  document.getElementById("location").innerHTML = data.name;
  document.getElementById("description").innerHTML = data.weather[0].description;
  document.getElementById("data_city").innerHTML = data.name;
  document.getElementById("data_temperature").innerHTML = Math.round((data.main.temp-273.15)*10)/10 + "°C";
  document.getElementById("data_humidity").innerHTML = data.main.humidity + "%";
  document.getElementById("data_wind_speed").innerHTML = data.wind.speed + "m/s";
  document.getElementById("data_wind_direction").innerHTML = data.wind.deg + "º";
  document.getElementById("data_pressure").innerHTML = data.main.pressure + "hPa";
  document.getElementById("data_sunrise").innerHTML = new Date(data.sys.sunrise*1000).toLocaleTimeString();
  document.getElementById("data_sunset").innerHTML = new Date(data.sys.sunset*1000).toLocaleTimeString();
;
}