import React from "react";
import "./feature.css";

const Feature = ({ title, text }) => {
  return (
    <div className="amst__feature">
      <h2>{title}</h2>
      <div className="amst__feature-content">
        <h3>{text}</h3>
        <p>Learn More</p>
      </div>
    </div>
  );
};

export default Feature;
