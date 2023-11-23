import React from "react";
import { Container } from "react-bootstrap";
import SignUp from "../../components/signUp/SignUp";
import { AuthProvider } from "../../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../../components/dashboard/Dashboard";
import Login from "../../components/login/Login";
import ForgotPassword from "../../components/forgotPassword/ForgotPassword";
import PrivateRoute from "../../components/privateRoute/PrivateRoute";
import { Navbar } from "../../components";

export const UserForm = () => {
  return (
    <>
      <Routes>
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
      </Routes>
    </>
  );
};

export default UserForm;
