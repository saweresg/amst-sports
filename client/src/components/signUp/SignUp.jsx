import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import "./signUp.css";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "../navbar/Navbar";
import axios from "axios";

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const firstRef = useRef();
  const lastRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      var newUser = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      var email = newUser.user.email;
      var uid = newUser.user.uid;

      const data = {
        firstName: firstRef.current.value,
        lastName: lastRef.current.value,
        uid: uid,
        email: email,
      };

      axios.post(process.env.REACT_APP_DATABASE_URL + "/users/", data);
      navigate("/");
    } catch (err) {
      if (err.code == "auth/email-already-in-use") {
        setError("The email address is already in use");
      } else if (err.code == "auth/invalid-email") {
        setError("The email address is not valid.");
      } else if (err.code == "auth/operation-not-allowed") {
        setError("Operation not allowed.");
      } else if (err.code == "auth/weak-password") {
        setError("The password is too short (minimum 8 characters)");
      }
    }

    setLoading(false);
  }

  return (
    <>
      <Container
        className="d-flex flex-column align-items-center justify-content-start"
        style={{ minHeight: "100vh", background: "var(--color-bg)" }}
      >
        <div className="align-self-stretch justify-content pb-5">
          <Navbar />
        </div>
        <div
          className="w-100"
          style={{ maxWidth: "400px", background: "none" }}
        >
          <Card style={{ background: "#FF6D4D", border: "3px solid #FF6D4D" }}>
            <Card.Body>
              <h2
                className="text-center mb-4"
                style={{
                  color: "rgba(0, 0, 0, 0.65)",
                  fontFamily: "var(--font-family)",
                  fontWeight: "600",
                }}
              >
                Sign Up
              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                    style={{
                      background: "#FFF6DD",
                      border: "1px solid #FFF6DD",
                      opacity: "0.9",
                    }}
                  />
                </Form.Group>
                <Form.Group id="first">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={firstRef}
                    required
                    style={{
                      background: "#FFF6DD",
                      border: "1px solid #FFF6DD",
                      opacity: "0.9",
                    }}
                  />
                </Form.Group>
                <Form.Group id="last">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={lastRef}
                    required
                    style={{
                      background: "#FFF6DD",
                      border: "1px solid #FFF6DD",
                      opacity: "0.9",
                    }}
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    required
                    style={{
                      background: "#FFF6DD",
                      border: "1px solid #FFF6DD",
                      opacity: "0.9",
                    }}
                  />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={confirmPasswordRef}
                    required
                    style={{
                      background: "#FFF6DD",
                      border: "1px solid #FFF6DD",
                      opacity: "0.9",
                    }}
                  />
                </Form.Group>
                <Button type="submit" className="w-100" disabled={loading}>
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/user/login">Log In</Link>
          </div>
        </div>
      </Container>
    </>
  );
}

export default SignUp;
