import React, { useContext } from "react";
import logo1 from "../../src/Components/assets/Daco_4249607.png";
import { Link } from "react-router-dom";
function Navbar({ setSearchText }) {
  return (
    <nav className="navbar-container">
      <header className="nav-header">
        <Link to="/">
          <img src={logo1} className="nav-logo"></img>
        </Link>
      </header>
      <div className="input-effect">
        <input
          className="search-input"
          type="text"
          placeholder="Search Pokemon"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </nav>
  );
}

export default Navbar;
