import React from "react";
import styled from "@emotion/styled";

const Icon = props => {
  const Icon = styled.img`
    width: 40%;
  `;
  console.log(props.condition);
  var icon = "";
  switch (props.condition) {
    case "Cloudy":
      icon = `./img/Mostly Cloudy-2x.png`;
      break;
    case "Sunny":
      icon = `./img/Mostly Sunny-2x.png`;
      break;
    case "Hazy Sunshine":
      icon = `./img/Haze-2x.png`;
      break;
    case "Sleet":
      icon = `./img/Hail-2x.png`;
      break;
    case "Fog":
      icon = `./img/Fog-2x.png`;
      break;
    case "Dreary":
      icon = `./img/Dust-2x.png`;
      break;
    case "Snow":
      icon = `./img/Snow-2x.png`;
      break;
    case "Rain":
      icon = `./img/Rain-2x.png`;
      break;
    case "Showers":
      icon = `./img/Drizzle-2x.png`;
      break;
    case "T-Storms":
      icon = `./img/Severe Thunderstorm-2x.png`;
      break;
    default:
      icon = `./img/Fog-2x.png`;
      break;
  }

  return <Icon src={icon} alt="Weather Icon" />;
};

export default Icon;

            