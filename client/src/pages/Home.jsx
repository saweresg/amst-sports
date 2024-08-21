import React from "react";
// import './home.css'

import { Balls, Feature, Navbar } from "../components";
import {
  Header,
  Footer,
  WhatIs,
  Booking,
  SignForm,
  UserForm,
} from "../containers";
// import { Outlet } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Balls />
      <WhatIs />
    </>
  );
}
