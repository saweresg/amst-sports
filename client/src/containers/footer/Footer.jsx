import React from "react";

import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="links">
          <ul className="nav">
            <li>
              <NavLink to="/" className={"navbar-link"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={"navbar-link"}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/facilities" className={"navbar-link"}>
                Facilities
              </NavLink>
            </li>
            <li>
              <NavLink to="/booking" className={"navbar-link"}>
                Book Now
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="footer-bottom">
          <div className="footer-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="footer-bottom-text">
            <p>The Church of Archangel Michael and St. Tekla</p>
            <p>12091 Hurontario Street Brampton, Ontario, Canada</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
