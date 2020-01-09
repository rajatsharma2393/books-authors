import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

export default () => {
  return (
    <header>
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
    </header>
  );
};
