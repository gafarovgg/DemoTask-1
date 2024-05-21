import React from "react";
import "./index.scss";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header">
          <img
            src="https://preview.colorlib.com/theme/shop/img/logo.png"
            alt=""
          />
          <nav>
            <ul>
              <li>
                <NavLink>Home</NavLink>
              </li>
              <li>
                <NavLink>Category</NavLink>
              </li>
              <li>
                <NavLink>Men</NavLink>
              </li>
              <li>
                <NavLink>Women</NavLink>
              </li>
              <li>
                <NavLink>Latest</NavLink>
              </li>
              <li>
                <NavLink>Add Shops</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
