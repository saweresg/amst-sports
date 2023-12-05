import React from "react";
import { Navbar } from "../../components";
import "./about.css";
import church from "../../assets/churchOutside.svg";
import Footer from "../footer/Footer";

export default function About() {
  return (
    <div className="about">
      <Navbar />
      <h1>About Us</h1>
      <div className="about-church">
        <img src={church} alt="church" />
        <h2>The Church of Archangel Michael and St.Tekla</h2>
        <p>
          We are a Coptic Orthodox Church Located in Brampton, Ontario. We Have
          been around for more than 25 years, We have recently completed an
          extension to the building adding a gymnasium and daycare.
          <br />
          <br />
          The Coptic Orthodox Church is originally rooted in Egypt but is now
          found all over the world, and open to all nationalities and
          backgrounds. Feel free to attend any of our services.
          <br />
          <br /> More information can be found on: https://sttekla.org/
        </p>
      </div>
      <Footer />
    </div>
  );
}
