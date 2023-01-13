// Countries data to fetch random countries
import countries from "../data/countries.js";

// Queries the open weather database for the current weather data
async function getRequest(locationData) {
  let request;

  // Executes if the arguments is an object (latittude and longitude)
  if (typeof locationData === "object") {
    let latitude = locationData[0];
    let longitude = locationData[1];
    request = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=20f7632ffc2c022654e4093c6947b4f4`;
  }
  // Executes if the argument is a string (City Name)
  else {
    request = `https://api.openweathermap.org/data/2.5/weather?q=${locationData}&APPID=20f7632ffc2c022654e4093c6947b4f4`;
  }

  let response;
  try {
    // Runs if all goes well
    response = await fetch(request);
  } catch (error) {
    //Runs if request returns error (Does not get to the server)
    return 404;
  }
  // Runs if the server does not return success
  if (!response.ok) {
    return 400;
  }

  // Builds the data and also the weather name on success
  let data = await response.json();
  let currentWeatherName = data.weather[0].main;
  return [data, currentWeatherName];
}

// Function to query the giphy api for the gifs
async function getGif(searchInput) {
  const request = `https://api.giphy.com/v1/gifs/translate?api_key=9Irfv12EE5h8tj4TGFf7pIJgSYg8u9l4&s=${searchInput}`;
  let response;
  try {
    response = await fetch(request);
  } catch (error) {
    // Runs if there's any error with the giphy API request
    return 404;
  }
  const recievedData = await response.json();
  const imageUrl = recievedData.data.images.original.url;
  return imageUrl;
}

// Gets a city from the cities data at random
function getRandomCity() {
  const randomIndex = Math.floor(Math.random() * countries.length);
  const item = countries[randomIndex];
  return item.name;
}

export { getRequest, getGif, getRandomCity };
