import React from "react";
import "./header.css";
import bball from "../../assets/bball.svg";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/booking");
  }

  return (
    <div className="amst__header">
      <div className="amst__header-text">
        <div>
          <h1>AMST SPORTS</h1>
          <h2>Rentals-Leagues-Programs</h2>
        </div>

        <button onClick={handleClick} type="button">
          Book Now
        </button>
      </div>
      <div className="amst__header-picture">
        <img src={bball} alt="basketball court" />
      </div>
    </div>
  );
};

export default Header;
