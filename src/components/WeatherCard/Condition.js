import React from "react";
import styled from "@emotion/styled";

const Condition = ({ temp, condition }) => {
  return (
    <>
      <div style={{ fontSize: "2rem" }}>
      </div>
      <State>{condition}</State>
    </>
  );
};

export default Condition;

const State = styled.h3`
  font-family: "Merriweather", sans-serif;
  font-size: 1.2rem;
`;

const reelStyle = {
  reel: {
    height: "1.07em",
    display: "flex",
    alignItems: "flex-end",
    overflowY: "hidden",
    lineHeight: "0.97em",
    justifyContent: "center",
  },
  group: {
    transitionDelay: "0",
    transitionTimingFunction: "ease-in-out",
    transform: "translate(0, 0)",
    height: "1.5em",
  },
  number: {
    height: "1em",
    fontFamily: "Fira sans",
    fontWeight: 200,
  },
};
