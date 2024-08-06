import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "../navbar/Navbar";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (err) {
      setError("Wrong email and/or password");
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
      <div className="w-100" style={{ maxWidth: "400px", background: "none" }}>
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
              Log In
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  style={{ background: "var(--color-bg)", opacity: 0.9 }}
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  required
                  style={{ background: "var(--color-bg)", opacity: 0.9 }}
                />
              </Form.Group>
              <Button type="submit" className="w-100" disabled={loading}>
                Log In
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/user/forgot-password">Forgot Password?</Link>
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

export default Login;
