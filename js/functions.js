async function getRequest(cityName){
  let request = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=20f7632ffc2c022654e4093c6947b4f4` 
  let response = await fetch(request)
  let data = await response.json()
  console.log(data)
let currentWeather = data.weather[0].main
return [data, currentWeather]
}


async function getGif(searchInput){
  const request =  `https://api.giphy.com/v1/gifs/translate?api_key=9Irfv12EE5h8tj4TGFf7pIJgSYg8u9l4&s=${searchInput}`
  const response = await fetch(request)
    const data = await response.json()
    const imageUrl = data.data.images.original_still.url
    return imageUrl
}


export { getRequest, getGif}