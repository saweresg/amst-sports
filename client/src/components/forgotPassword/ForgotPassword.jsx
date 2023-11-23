import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
// import { Link, useNavigate } from 'react-router-dom'
import { Container } from "react-bootstrap";
import Navbar from "../navbar/Navbar";

function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      console.log("HELLOWORLD");

      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch (err) {
      // setError(err.message)
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-start"
      style={{ minHeight: "100vh", background: "var(--color-bg)" }}
    >
      <div className="align-self-stretch justify-content pb-5">
        <Navbar />
      </div>
      <div className="w-100" style={{ maxWidth: "400px", margin: "2rem" }}>
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
              Reset Password
            </h2>
            {message && <Alert variant="success">{message}</Alert>}
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
              <Button type="submit" className="w-100" disabled={loading}>
                Reset Password
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/user/login">Log in</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/user/signup">Sign Up</Link>
        </div>
      </div>
    </Container>
  );
}

export default ForgotPassword;
