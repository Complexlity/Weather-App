import {getRequest, getGif} from './functions.js'

let dq = document.querySelector.bind(document)
let dqa = document.querySelectorAll.bind(document)
let c = console.log.bind(document)

let root = dq(':root')

let searchForm = dq('[data-search]')
console.log(searchForm)
let searchButton = dq('[data-searchBtn')
let searchInput = searchForm.querySelector('input')
let cityName = dq('[data-cityName]')
let time = dq('[data-time]')
let temperature = dq('[data-temperature]')
let weather = dq('[data-weather]')
let windPressure = dq('[data-windPressure]')
let windSpeed = dq('[data-windSpeed]')
let humidity = dq('[data-humidity]')
let weatherIcon = dq('[data-weatherIcon]')
let country = dq('[data-country]')
let gif = dq('[data-gif]')
let loader = dq('[data-loader]')
let loading = dq('.loader')
let redirect

window.onload = function(){
  loadSite('London')
}


searchForm.addEventListener('submit', (e) =>{
  e.preventDefault()
  submitQuery()
})

searchButton.addEventListener('click', submitQuery)

function submitQuery(){
    let query = searchInput.value
    if(!query) return
      searchInput.value = ''
      loadSite(query)
    
}







async function loadSite(cityName){
  
  
  loader.classList.add('transition-none')
  loader.style.opacity = '1'
  loader.style.display = 'flex'
  let weatherData = await getRequest(cityName)
  if (weatherData === 400) {
    alert('NOT FOUND. Go To Default')
    loadSite('LONDON')
    return
  }
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
    let weatherArray = ['rain', 'clouds', 'clear', 'mist','snow']
    let weatherName = weatherData[1].toLowerCase()
    backgroundImage = `url('../assets/${weatherName}.jpg')`
    if(!(weatherArray.includes(weatherName))) backgroundImage = '#111827'
    root.style.setProperty('--bg-image', backgroundImage)
    
    cityName.innerHTML = data.name;
    time.innerHTML = `Today ${today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
    temperature.innerHTML = Math.round((data.main.temp-273.15)*10)/10 + "°C";
    weatherIcon.src = "http://openweathermap.org/img/w/" + iconCode + ".png"
    weatherIcon.style.display = 'inline-block'
    weather.innerHTML = weatherData[1]
    windPressure.innerHTML = data.main.pressure + 'hpa'
    humidity.innerHTML = data.main.humidity + '%'
    windSpeed.innerHTML = data.wind.speed + 'm/s'
    gif.src = backgroundGif
    loader.classList.remove('transition-none')
    loader.style.opacity = '0'
    
  }