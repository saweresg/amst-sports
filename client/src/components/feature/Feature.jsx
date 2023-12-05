import React from "react";
import "./feature.css";
import { useNavigate } from "react-router-dom";

const Feature = ({ title, text, link }) => {
  const navigate = useNavigate();
  return (
    <div className="amst__feature">
      <h2>{title}</h2>
      <div className="amst__feature-content">
        <h3>{text}</h3>
        <p onClick={() => navigate(link)}>Learn More</p>
      </div>
    </div>
  );
};

export default Feature;
