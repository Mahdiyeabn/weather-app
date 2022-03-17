import React, { useState, useEffect } from "react";

import WeatherCard from "./WeatherCard/component";

const WeatherEngine = ({ location }) => {
  // init for our state variables
  const [query, setQuery] = useState(""); // for user query
  const [error, setError] = useState(false); // for error handeling
  const [loading, setLoading] = useState(false); // for loading state
  const [weather, setWeather] = useState({
    // to display and store weather for specific cities
    temp: null,
    city: null,
    condition: null,
    country: null,
  });

  const apiKey = "BA96Hm5zGXOSmG3WDgrtZOdrIu1e7l7F";
  //defining the data fetchin function
  const getWeather = async (q) => {
    setQuery(""); // reset the query to empty
    setLoading(true); // set loading to true while we fetch the results
    try {
      const apiRes = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${q}&details=true`
      );

      const resJSON = await apiRes.json();
      console.log(resJSON);
      const location = resJSON[0].Details.Key;
      console.log(location);
      const forcast = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${location}?apikey=${apiKey}`);
      const result = await forcast.json();
      console.log("result: ");
      console.log(result);
      
      const tempMin = result.DailyForecasts[0].Temperature.Minimum.Value;
      const tempMax = result.DailyForecasts[0].Temperature.Maximum.Value;
      const condition = result.Headline.Text;
      const country = resJSON[0].Country.LocalizedName;
      const city = resJSON[0].LocalizedName;

      setWeather({
        temp: `${tempMin} - ${tempMax}`,
        city: city,
        condition: condition,
        country: country,
      });
    } catch (error) {
      console.log(error);
      console.log("weather not loaded");
      setError(true); 
    }
    setLoading(false);
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
      temp={weather.temp}
      condition={weather.condition}
      city={weather.city}
      country={weather.country}
      getWeather={getWeather}
    />
  );
};

export default WeatherEngine;