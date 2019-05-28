import React from "react";
import { Link, Route } from "react-router-dom";
import LoginFormContainer from "./login_form_container";
import SignupFormContainer from "./signup_form_container";

class Formpage extends React.Component {
  render() {
    const form =
      this.props.match.path === "/login" ? (
        <LoginFormContainer />
      ) : (
        <SignupFormContainer />
      );

    return (
      <div className="form-content">
        <div className="form-background">
          <div className="right-split">
            <img
              className="form-image"
              src="https://discordapp.com/assets/fd91131ea693096d6be5e8aa99d18f9e.jpg"
              alt=""
            />
          </div>
          <canvas className="form-canvas" />
          <div className="left-split">
            <Link to="/" className="form-logo" />
            <div className="form-wrapper">{form}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default Formpage;
