import {getRequest, getGif, getRandomCity} from './functions.js'

let dq = document.querySelector.bind(document)
let dqa = document.querySelectorAll.bind(document)
let c = console.log.bind(document)

let root = dq(':root')

let searchForm = dq('[data-search]')
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
let gif = dq('[data-gif]')
let loader = dq('[data-loader]')
// London latitude and longitude
let lat = '51.5085'
let lon = '-0.1257'

window.onload = function(){
  getDefaultLocation()
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
      query =   query.replace(/(\s+$|^\s+)/g, '')
      loadSite(query)

    
}







async function loadSite(cityName){
  loader.classList.add('transition-none')
  loader.style.opacity = '1'
  let weatherData = await getRequest(cityName)
  if (weatherData === 400) {
    alert(cityName.toUpperCase() + ' Not Found!. Resetting to your location')
    getDefaultLocation()
    return
  }
    let backgroundGif = await getGif(weatherData[1])
    let data = [weatherData, backgroundGif]
    updatePage(data)
  }
  
  
async function getDefaultLocation(){
  if (navigator.geolocation) { // device can return its location
    function success(position) {
        lat = position.coords.latitude;
         lon = position.coords.longitude;
         loadSite([lat, lon])
    }

    function error(err){
      alert('Location Data Not Shared!! Rerouting to random location')
      let randomCity = getRandomCity()
      loadSite(randomCity)
    }

      navigator.geolocation.getCurrentPosition(success, error)
  }
}

  function updatePage(data){
    let weatherData = data[0]
    let backgroundGif = data[1]
    gif.src = backgroundGif
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
    windSpeed.innerHTML = data.wind.speed + 'mph'
    loader.classList.remove('transition-none')
    loader.style.opacity = '0'
    
  }