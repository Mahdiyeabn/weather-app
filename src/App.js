import React, {useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

const weaterApiKey = "BA96Hm5zGXOSmG3WDgrtZOdrIu1e7l7F";

function App() {

  const [search, setSearch] = useState("");
  const [error, setError] = useState(false); // for error handeling
  const [loading, setLoading] = useState(false); // for loading state
  const [weather, setWeather] = useState({
    // to display and store weather for specific cities
    temp: null,
    city: null,
    condition: null,
    country: null,
  });

  const getWeatherAsync = async (search) => {
    
    setLoading(true);

    try {

      const cityData = CitySearchAsync(search);
      const response = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityData.key}`,
        {
          params: {
            apiKey: weaterApiKey,
          },
        },
      );
      console.log(response.json());
      const transformData = await response.data.list.map((data) => ({
        dt: data[0],
        //temp: bla,
        //temp_min: data.main.temp_min,
        //temp_max: data.main.temp_max,
        //humidity: data.main.humidity,
        //icon: data.weather[0].icon,
        //desc: data.weather[0].description,
        //clouds: data.clouds.all,
        //wind: data.wind.speed,
      }));

      setWeather({
        temp: `${tempMin} - ${tempMax}`,
        city: city,
        condition: condition,
        country: country,
      });

      setLoading(false);
    } catch (err) {
        setError(true);
        console.log(err.stack);
    }
  };
  
  async function CitySearchAsync(search) {
    try {
      const response = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/search`,
        {
          params: {
            q: search,
            apiKey: weaterApiKey,
          },
        },
      );
      console.log(response.json());
      
      const cityData = await response.data.list.map((data) => ({
        dt: data[0],
        key: data[0].Key,
        name: data[0].LocalizedName,
      }));

      return cityData;

    } catch (err) {
        console.error("get City data failed");
        setError(err.stack);
        return;
    }
  };

  

  useEffect(() => {
    getWeatherAsync(search);
  
  }, []);
  
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
}

export default App;
