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
      <span onClick={this.clickHandler} className="login-button">
        Logout
      </span>
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
              <img src="https://discordapp.com/assets/192cb9459cbc0f9e73e2591b700f1857.svg" />
            </div>
            <ul className="right-nav">
              <li>{button}</li>
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}

export default navbar;
