import React from "react";
import styled from "@emotion/styled";

import Location from "./Location";
import Icon from "./Icon";
import Condition from "./Condition";

const WeatherCard = ({ tempMin, tempMax, condition, city, country, getWeather }) => {
  let highColor = 0;
  let lowColor = 0;
  let bg = null;
  if (tempMin > 12) {
    // This is for hot weather
    highColor = (1 - (tempMin - 12) / 28) * 255;
    lowColor = highColor - 200;
    bg = `linear-gradient(
      to top,
      rgb(255, ${highColor}, 0),
      rgb(255, ${Math.abs(lowColor)}, 0)
    )`;
  } else if (+tempMin <= 12) {
    // This is for cold weather
    highColor = (1 - (tempMin + 20) / 32) * 255;
    lowColor = highColor - 200;
    bg = `linear-gradient(
      to top,
      rgb(0, ${highColor}, 255),
      rgb(0, ${Math.abs(lowColor)}, 255)
    )`;
  }
  const Card = styled.div`
    margin: 0 auto;
    background: ${bg};
    width: 200px;
    height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 15px;
  `;

  return (
   
    <Card>
      <Location getWeather={getWeather} city={city} country={country} />
      <Icon condition={condition} />
      <Condition temp={tempMin} condition={condition} />
    </Card>

   
  );
};

export default WeatherCard;
