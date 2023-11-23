import React from "react";
import "./balls.css";
import volleyball from "../../assets/volleyball.png";
import basketball from "../../assets/basketball.png";
import soccer from "../../assets/soccer.png";
import hockey from "../../assets/hockey.png";
import ping from "../../assets/ping.png";

const Balls = () => {
  return (
    <div className="amst__balls">
      <div>
        <img src={volleyball} alt="volleyball" />
      </div>
      <div>
        <img src={basketball} alt="basketball" />
      </div>
      <div>
        <img src={soccer} alt="soccer" />
      </div>
      <div>
        <img src={hockey} alt="hockey" />
      </div>
      <div>
        <img src={ping} alt="ping" />
      </div>
    </div>
  );
};

export default Balls;
