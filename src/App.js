import React from "react"
import "./App.css"

function App ()  {
  const key = "bmFBg30CyBSZQkFWW2ZWpQ7tFQO9lXrd";

  // get weather information
  const getWeather = async (id) => {
    const base = "http://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
  };

  // get city information
  const getCity = async (city) => {
    const base =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
  };

  const cityForm = document.querySelector("form");
  const card = document.querySelector(".card");
  const details = document.querySelector(".details");
  const time = document.querySelector("img.time");
  const icon = document.querySelector(".icon img");

  const updateUI = (data) => {
    // destructure properties
    const { cityDets, weather } = data;

    // update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

    // update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute("src", iconSrc);

    const timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
    time.setAttribute("src", timeSrc);

    // remove the d-none class if present
    if (card.classList.contains("d-none")) {
      card.classList.remove("d-none");
    }
  };

  const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);
    return { cityDets, weather };
  };

  cityForm.addEventListener("submit", (e) => {
    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    updateCity(city)
      .then((data) => updateUI(data))
      .catch((err) => console.log(err));
  });
  return (
    <div class="container my-5 mx-auto">

      <h1 class="text-muted text-center my-4">Weather Ninja</h1>
  
      <form class="change-location my-4 text-center text-muted">
        <label for="city">Enter a location for weather information</label>
        <input type="text" name="city" class="form-control p-4"></input>
      </form>
      
      <div class="card shadow-lg rounded d-none">
        <img src="https://via.placeholder.com/400x300" class="time card-img-top"> </img>
        <div class="icon bg-light mx-auto text-center">
          <img src="" alt=""></img>
        </div>
        <div class="text-muted text-uppercase text-center details"></div>
      </div>
      
    </div> 
  )
    
};
export default App;
