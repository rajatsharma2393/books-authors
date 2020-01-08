import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

export default () => {
  return (
    <footer>
      <div className="header-image">
        <img src="./logo192.png" alt=" cannot be loaded" />
      </div>
      <div className="header-navs">
        <NavLink to="/" activeClassName="activeRoute" exact>
          Home
        </NavLink>
        <NavLink to="/books" activeClassName="activeRoute">
          Books
        </NavLink>
        <NavLink to="/authors" activeClassName="activeRoute">
          Authors
        </NavLink>
      </div>
    </footer>
  );
};
