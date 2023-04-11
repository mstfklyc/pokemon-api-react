import React, { useContext } from "react";
import { useState } from "react";
import logo1 from "../../src/Components/assets/Daco_4249607.png";
import { Link } from "react-router-dom";
import PokemonContext from "../context/PokeContext";
function Navbar({ setSearchText }) {
  return (
    <nav className="navbar-container">
      <header className="nav-header">
        <Link to="/">
          <img src={logo1} className="nav-logo"></img>
        </Link>
      </header>
      <div className="search-input">
        <h1>Search Pokemon</h1>
        <input
          className="input"
          type="text"
          placeholder="Pokemon Name"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </nav>
  );
}

export default Navbar;
