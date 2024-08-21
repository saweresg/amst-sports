import React from "react";

import { Balls, Feature, Navbar } from "../components";
import {
  Header,
  Footer,
  WhatIs,
  Booking,
  SignForm,
  UserForm,
} from "../containers";

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <Booking />
      {/* <Footer /> */}
    </>
  );
}
