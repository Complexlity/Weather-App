import { getRequest, getGif, getRandomCity } from "./functions.js";
// Gets the required functions

// Shortens the selector code so we could now use this throughout the file
let dq = document.querySelector.bind(document);

// Gets all the neccessary dom element for manipulation
let root = dq(":root");
let searchForm = dq("[data-search]");
let searchInput = searchForm.querySelector("input");
let cityName = dq("[data-cityName]");
let time = dq("[data-time]");
let temperature = dq("[data-temperature]");
let weather = dq("[data-weather]");
let windPressure = dq("[data-windPressure]");
let windSpeed = dq("[data-windSpeed]");
let humidity = dq("[data-humidity]");
let weatherIcon = dq("[data-weatherIcon]");
let gif = dq("[data-gif]");
let loader = dq("[data-loader]");
let locationIcon = dq("[data-locationIcon]");
let humidityIcon = dq("[data-humidityIcon]");
let windSpeedIcon = dq("[data-windSpeedIcon]");
let windPressureIcon = dq("[data-windPressureIcon]");
let lat, lon;

// Runs on default when the application initiall starts
window.onload = function () {
  getDefaultLocation();
};

// Triggers when the query is entered in the form and submitted
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitQuery();
});

// Gets the input value, removes white spaces and
function submitQuery() {
  let query = searchInput.value;
  if (!query) return;
  searchInput.value = "";
  query = query.replace(/(\s+$|^\s+)/g, "");
  loadSite(query);
}

async function loadSite(location) {
  loader.classList.add("transition-none");
  loader.style.opacity = "1";
  // Runs the fetch request and returns either error or success
  let weatherData = await getRequest(location);

  // runs if the server returns error
  if (weatherData === 400) {
    alert(location.toUpperCase() + " Not Found!. Resetting to your location");
    getDefaultLocation();
    return;
  }
  // runs if the query was unable to get to the server
  else if (weatherData === 404) {
    showError();
    return;
  }
  let backgroundGif = await getGif(weatherData[1]);

  // runs if giphy api request fails
  if (backgroundGif == 404) backgroundGif = useDefaultGif(); // Runs if the giphy api returs error

  let data = [weatherData, backgroundGif];

  // Updates the dom with the data gotten from the APIs
  updatePage(data);
}

async function getDefaultLocation() {
  if (navigator.geolocation) {
    // device can return its location

    function success(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      loadSite([lat, lon]);
    }

    function error() {
      alert("Location data unauthorized!! Rerouting to random location");
      let randomCity = getRandomCity();
      loadSite(randomCity);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function updatePage(data) {
  let weatherData = data[0];
  let backgroundGif = data[1];
  gif.src = backgroundGif;
  data = weatherData[0];
  let iconCode = data.weather[0].icon;
  let today = new Date();

  let backgroundImage;
  let weatherArray = ["rain", "clouds", "clear", "mist", "snow", "haze"];
  let weatherName = weatherData[1].toLowerCase();
  backgroundImage = `url('../assets/${weatherName}.jpg')`;

  if (!weatherArray.includes(weatherName)) backgroundImage = "#e0f2fe";
  root.style.setProperty("--bg-image", backgroundImage);

  if (weatherName === "rain") setTheme("light");
  else setTheme("dark");

  if (data.name.length > 8) {
    cityName.style.fontSize = time.style.fontSize = ".9em";
  } else cityName.style.fontSize = time.style.fontSize = "1em";

  cityName.innerHTML = data.name;
  time.innerHTML = `Today ${today.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })}`;
  temperature.innerHTML =
    Math.round((data.main.temp - 273.15) * 10) / 10 + "°C";
  weatherIcon.src = "https://openweathermap.org/img/w/" + iconCode + ".png";
  weatherIcon.style.display = "inline-block";
  weather.innerHTML = weatherData[1];
  windPressure.innerHTML = data.main.pressure + "hpa";
  humidity.innerHTML = data.main.humidity + "%";
  windSpeed.innerHTML = data.wind.speed + "mph";
  loader.classList.remove("transition-none");
  loader.style.opacity = "0";
}

// Changes theme in rainy weather. Due to rainy gif being to bright
function setTheme(theme) {
  if (theme == "light") {
    locationIcon.src = "./assets/location_white.png";
    humidityIcon.src = "./assets/humidity_white.png";
    windSpeedIcon.src = "./assets/wind-speed_white.png";
    windPressureIcon.src = "./assets/wind-pressure_white.png";
    root.style.setProperty("--text-clr", "white");
  } else if (theme == "dark") {
    locationIcon.src = "./assets/location.png";
    humidityIcon.src = "./assets/humidity.png";
    windSpeedIcon.src = "./assets/wind-speed.png";
    windPressureIcon.src = "./assets/wind-pressure.png";
    root.style.setProperty("--text-clr", "black");
  }
}

// Todo: Write function if could not connect to the API
function showError() {
  console.log("Could not connect to weather API");
}

// Todo: Write function to provide default gif if giphy api response not successful
function useDefaultGif() {
  console.log("Could not connect to giphy API");
}
