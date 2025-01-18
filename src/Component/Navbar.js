import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <div>
        <nav
          className={`navbar navbar-expand-lg ${this.props.darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}
        >
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              NewsNow
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    General
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/business">
                    Business
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/entertainment">
                    Entertainment
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/health">
                    Health
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/science">
                    Science
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sports">
                    Sports
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/technology">
                    Technology
                  </Link>
                </li>
              </ul>
              {/* Dark Mode Toggle Switch with Icon */}
              <div className="form-check form-switch">
                <i
                  className={`me-2 ${this.props.darkMode ? "fas fa-moon" : "fas fa-sun"}`}
                ></i>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  checked={this.props.darkMode} // Controlled by parent state
                  onChange={this.props.toggleDarkMode} // Calls parent function
                />
                <label className="form-check-label ms-2" htmlFor="flexSwitchCheckDefault">
                  {this.props.darkMode ? "Dark Mode" : "Light Mode"}
                </label>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

// Define PropTypes to validate the props passed from the parent
Navbar.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default Navbar;
