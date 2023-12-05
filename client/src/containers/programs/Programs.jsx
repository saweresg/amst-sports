import React from "react";
import { Navbar } from "../../components";
import Footer from "../footer/Footer";
import "./programs.css";

export default function Programs() {
  return (
    <div>
      <Navbar />
      <div className="programs" style={{ minHeight: "55vh" }}>
        <h1>Programs and Leagues</h1>
        <p>
          The registration is currently closed for our winter futsal league, and
          kids soccer program
        </p>
      </div>
      <Footer />
    </div>
  );
}
