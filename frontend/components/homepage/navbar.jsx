import React from "react";
import { Link } from "react-router-dom";

class navbar extends React.Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.logout();
  }

  render() {
    const { currentUser } = this.props;

    const button = currentUser ? (
      <Link className="login-button" to="/servers/@me">
        Open
      </Link>
    ) : (
      <Link className="login-button" to="/login">
        Login
      </Link>
    );

    return (
      <div className="nav-component">
        <header className="header">
          <nav className="nav-bar">
            <div className="left-nav">
              <img src="https://res.cloudinary.com/divtvpzuc/image/upload/v1559268535/disco-rd_logo_with_reflection.png" />
            </div>
            <ul className="right-nav">
              <li className="nav-icon">
                <a
                  href="https://elvis-yuan.github.io/"
                  target="new"
                  className="linkedin-icon"
                >
                  <i className="fas fa-portrait" />
                </a>
              </li>
              <li className="nav-icon">
                <a
                  href="https://angel.co/elvis-yuan-1"
                  target="new"
                  className="linkedin-icon"
                >
                  <i className="fab fa-angellist" />
                </a>
              </li>
              <li className="nav-icon">
                <a
                  href="https://www.linkedin.com/in/elvis-yuan/"
                  target="new"
                  className="linkedin-icon"
                >
                  <i className="fab fa-linkedin" />
                </a>
              </li>
              <li className="nav-icon">
                <a
                  href="https://github.com/elvis-yuan/Disco-RD"
                  className="github-icon"
                  target="new"
                >
                  <i className="fab fa-github" />
                </a>
              </li>
              <li>{button}</li>
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}

export default navbar;
