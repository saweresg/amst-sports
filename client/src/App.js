import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import { Container } from "react-bootstrap";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

import { Balls, Feature, Navbar } from "./components";
import {
  Header,
  Footer,
  WhatIs,
  Booking,
  SignForm,
  UserForm,
} from "./containers";
import Home from "./pages/Home";
import SignUp from "./components/signUp/SignUp";
import Login from "./components/login/Login";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import BookingPage from "./pages/BookingPage";
import AccountPage from "./pages/AccountPage";
import About from "./containers/about/About";
import Programs from "./containers/programs/Programs";
import Facilities from "./containers/facilities/Facilities";

function App() {
  return (
    <div className="main">
      <Router>
        <AuthProvider>
          {/* <UserForm /> */}
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route path="/booking" Component={BookingPage} />

            <Route
              path="/user"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            ></Route>
            <Route path="/user/signup" Component={SignUp} />
            <Route path="/user/login" Component={Login} />
            <Route path="/user/forgot-password" Component={ForgotPassword} />
            <Route
              path="/account"
              element={
                <PrivateRoute>
                  <AccountPage />
                </PrivateRoute>
              }
            ></Route>
            <Route path="/about" Component={About} />
            <Route path="/programs" Component={Programs} />
            <Route path="/facilities" Component={Facilities} />

            {/* <Route exact path='/checkout' element={<PrivateRoute><Dashboard/></PrivateRoute>}></Route> */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

// export default App
