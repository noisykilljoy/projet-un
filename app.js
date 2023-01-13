//current date display
let now = new Date();
let dateDisplayer = document.querySelector("#date-of-the-day");
let dateOfTheDay = displayDate();
dateDisplayer.innerHTML = dateOfTheDay;
let celsiusTemp = null;

//search engine
let usersSearchedCity = document.querySelector("#city-search-form");
usersSearchedCity.addEventListener("submit", cityChanger);
let usersSearchedCity2 = document.querySelector("#city-search-button");
usersSearchedCity2.addEventListener("click", cityChanger);
let usersGeolocation = document.querySelector("#geolocation-detector");
usersGeolocation.addEventListener("click", cityChangerWithGeolocation);

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
function displayTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}
function cityChanger(event) {
  let cityInput = document.querySelector("#city-search-input");
  event.preventDefault();
  let apiKey = "2718952144ed077c12e7c160fb6fc351";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(weatherFunc);
}

function weatherFunc(response) {
  let city = response.data.name;
  celsiusTemp = Math.round(response.data.main.temp);
  let descrip = response.data.weather[0].description;
  let wind = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let weatherIcon = response.data.weather[0].icon;
  let latlong = response.data.coord;

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
  weatherIconCode.setAttribute("src", `Thumbnails/weather/${weatherIcon}.png`);

  getForecast(latlong);
}

function getForecast(coordinates) {
  let apiKey = "aa4oftad8baaee9e63b2667c02fe71b9";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let dailyForecast = response.data.daily;
  dailyForecast.forEach(function (dailyForecast, index) {
    if (index < 3) {
      forecastHTML += `<div class="col-4 weather-forecast">
          <h3 class="weekday">${displayTime(dailyForecast.time)}</h3>
          <img class="thumbnail" src="Thumbnails/forecast/${
            dailyForecast.condition.icon
          }.png" alt="" />
          <div class="forecast-temps">
            <span class="forecast-low">${Math.round(
              dailyForecast.temperature.minimum
            )}˚</span> | 
            <span class="forecast-high">${Math.round(
              dailyForecast.temperature.maximum
            )}˚</span>
          </div>
        </div>`;
    }
    if (index === 3) {
      forecastHTML += `
    <hr />
    `;
    }
    if (index >= 3 && index < 6) {
      forecastHTML += `<div class="col-4 weather-forecast">
          <h3 class="weekday">${displayTime(dailyForecast.time)}</h3>
          <img class="thumbnail" src="Thumbnails/forecast/${
            dailyForecast.condition.icon
          }.png" alt="" />
          <div class="forecast-temps">
            <span class="forecast-low">${Math.round(
              dailyForecast.temperature.minimum
            )}˚</span> | 
            <span class="forecast-high">${Math.round(
              dailyForecast.temperature.maximum
            )}˚</span>
          </div>
        </div>`;
    }
  });
  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
