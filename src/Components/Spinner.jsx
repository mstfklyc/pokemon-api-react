import React from "react";
import spinner from "./assets/simple_pokeball.gif";
function Spinner() {
  return (
    <div className="spinner">
      <img className="spinner-gif" src={spinner}></img>
    </div>
  );
}

export default Spinner;
