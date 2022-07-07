import React from 'react';

class Navigation extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
          <a className="navbar-brand" href="#">
            <img
              src="https://mrapptastic.dk/da/assets/images/mr.png"
              alt="Henriks Portfolio"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span>
              <i className="fa fa-bars" aria-hidden="true"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav mr-auto d-flex justify-content-around w-100">
              <li className="nav-item">
                <a className="nav-link" href="#experience">
                  Experience
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#projects">
                  Projects
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#skills">
                  Skills
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#education">
                  Education
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#certificates">
                  Certifications
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#languages">
                  Languages
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#interests">
                  Interests
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#fun">
                  Fun
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;
