import React, { useState } from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const Menu = () => (
    <>
      <ul className="nav">
        <li>
          <NavLink to="/" className={"navbar-link"}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={"navbar-link"}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/facilities" className={"navbar-link"}>
            Facilities
          </NavLink>
        </li>
        <li>
          <NavLink to="/booking" className={"navbar-link"}>
            Book Now
          </NavLink>
        </li>
      </ul>
    </>
  );

  function handleLogin() {
    navigate("/user/login");
  }

  function handleSignup() {
    navigate("/user/signup");
  }

  async function handleLogout() {
    // setError("")

    try {
      await logout();
      if (location.pathname === "/") {
        navigate(0);
      } else {
        navigate("/");
      }
      // navigate(0);
    } catch {
      // setError('Failed to Log Out')
    }
  }

  return (
    <div className="amst__navbar">
      <div className="amst__navbar-links">
        <div className="amst__navbar-links_logo">
          <img
            src={logo}
            alt="logo"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="amst__navbar-links_container">
          <Menu />
        </div>
      </div>

      <div className="amst__navbar-sign">
        {currentUser ? (
          <>
            {/* <p onClick={() => navigate("/account")}>My Bookings</p> */}
            <NavLink to="/account" className={"navbar-link"}>
              My Bookings
            </NavLink>
            <button onClick={handleLogout} type="button">
              Sign Out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/user/login" className={"navbar-link"}>
              Sign In
            </NavLink>
            <button onClick={handleSignup} type="button">
              Sign Up
            </button>
          </>
        )}
      </div>

      <div className="amst__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="var(--color-text)"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="var(--color-text)"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="amst__navbar-menu_container scale-up-center">
            <div className="amst__navbar-menu_container-links">
              <Menu />
              <div className="amst__navbar-menu_container-links-sign">
                {currentUser ? (
                  <>
                    <NavLink to="/account" className={"navbar-link"}>
                      My Bookings
                    </NavLink>
                    <button onClick={handleLogout} type="button">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    {/* <p onClick={handleLogin}>Sign in</p> */}
                    <NavLink to="/user/login" className={"navbar-link"}>
                      Sign In
                    </NavLink>
                    <button onClick={handleSignup} type="button">
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
