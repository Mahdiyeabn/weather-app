import React, {useState, useEffect } from "react";
import axios from 'axios';
import WeatherCard from "./WeatherCard/component";

const weatherApiKey = "BA96Hm5zGXOSmG3WDgrtZOdrIu1e7l7F";

const WeatherEngine = ({ location }) => {

  // init for our state variables
  const [query, setQuery] = useState(""); // for user query
  const [error, setError] = useState(false); // for error handeling
  const [loading, setLoading] = useState(false); // for loading state
  const [weather, setWeather] = useState({
    // to display and store weather for specific cities
    tempMin: null,
    tempMax: null,
    city: null,
    condition: null,
    country: null,
  });

  const getWeather = async (search) => {
    setQuery(""); // reset the query to empty
    setLoading(true);

    try {

      const locationResponse = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${weatherApiKey}&q=${search}&details=true`
      );

      const cityData = await locationResponse.json();
      console.log(cityData[0].Key);
      const forecastResponse = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityData[0].Key}?metric=true&apikey=${weatherApiKey}`);

      const result = await forecastResponse.json();
      console.log(result);
      
      const tempMin = result.DailyForecasts[0].Temperature.Minimum.Value;
      const tempMax = result.DailyForecasts[0].Temperature.Maximum.Value;
      const condition = result.DailyForecasts[0].Day.IconPhrase;
      const country = cityData[0].Country.LocalizedName;
      const city = cityData[0].LocalizedName;

      setWeather({
        tempMin: tempMin,
        tempMax: tempMax,
        city: city,
        condition: condition,
        country: country,
      });

      setLoading(false);
    } catch (err) {
        setError(true);
        console.log(err);
    }
  };
  
 

  
  useEffect(() => {
    getWeather(location);
  }, [location]);

  if (error) {
    return (
      <div style={{ color: "black" }}>
        There has been an error!
        <br />
        <button onClick={() => setError(false)}>Reset!</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          color: "black",
          width: "200px",
          height: "240px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        
      </div>
    );
  }

  return (
    <WeatherCard
      tempMin={weather.tempMin}
      tempMax={weather.tempMax}
      condition={weather.condition}
      city={weather.city}
      country={weather.country}
      getWeather={getWeather}
    />
  );
};

export default WeatherEngine;