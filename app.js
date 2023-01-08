//current date display
let now = new Date();
function displayDate() {
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let minute = now.getMinutes();
  let hour = now.getHours();
  let date = now.getDate();
  let day = now.getDay();
  let month = now.getMonth();
  let year = now.getFullYear();
  let result = `${hour}:${minute} ${days[day]}, ${months[month]} ${date}, ${year}`;

  return result;
}
let dateDisplayer = document.querySelector("#date-of-the-day");
let dateOfTheDay = displayDate();
dateDisplayer.innerHTML = dateOfTheDay;

//search engine
let usersSearchedCity = document.querySelector("#city-search-form");
usersSearchedCity.addEventListener("submit", cityChanger);
let usersSearchedCity2 = document.querySelector("#city-search-button");
usersSearchedCity2.addEventListener("click", cityChanger);
let usersGeolocation = document.querySelector("#geolocation-detector");
usersGeolocation.addEventListener("click", cityChangerWithGeolocation);

function cityChanger(event) {
  let cityInput = document.querySelector("#city-search-input");
  event.preventDefault();
  let apiKey = "2718952144ed077c12e7c160fb6fc351";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(weatherFunc);
}

function cityChangerWithGeolocation(event) {
  event.preventDefault();
  function LatLong(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "2718952144ed077c12e7c160fb6fc351";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(weatherFunc);
  }
  navigator.geolocation.getCurrentPosition(LatLong);
}

function weatherFunc(response) {
  console.log(response.data);
  let city = response.data.name;
  celsiusTemp = Math.round(response.data.main.temp);
  let descrip = response.data.weather[0].description;
  let wind = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let weatherIcon = response.data.weather[0].icon;

  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = city;
  let tempDisplay = document.querySelector("#temperature");
  tempDisplay.innerHTML = celsiusTemp;
  let descripDisplay = document.querySelector("#description");
  descripDisplay.innerHTML = descrip;
  let windDisplay = document.querySelector("#wind");
  windDisplay.innerHTML = wind;
  let humidityDisplay = document.querySelector("#humidity");
  humidityDisplay.innerHTML = humidity;
  let weatherIconCode = document.querySelector("#icon-code");
  weatherIconCode.setAttribute("src", `Thumbnails/simba/${weatherIcon}.png`);
}

//parameter changer
// function convertFtoC(event) {
//   event.preventDefault();
//   let cityTemperature = document.querySelector("#temperature");
//   cityTemperature.innerHTML = "66";
// }
// let toFarenheitTempConverter = document.querySelector("#farenheit");
// toFarenheitTempConverter.addEventListener("click", convertFtoC);

// function convertCtoF(event) {
//   event.preventDefault();
//   let cityTemperature = document.querySelector("#temperature");
//   cityTemperature.innerHTML = "17";
// }
// let toCelsiusTempConverter = document.querySelector("#celsius");
// toCelsiusTempConverter.addEventListener("click", convertCtoF);

function showFarenheit(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#temperature");
  let tempInFarenheit = Math.round((celsiusTemp * 9) / 5 + 32);
  tempDisplay.innerHTML = tempInFarenheit;
  let degreeUnit = document.querySelector("#f-or-c");
  degreeUnit.innerHTML = "˚F";
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
}
function showCelsius(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("#temperature");
  tempDisplay.innerHTML = celsiusTemp;
  let degreeUnit = document.querySelector("#f-or-c");
  degreeUnit.innerHTML = "˚C";
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

let celsiusTemp = null;
let FarenheitTemp = null;
