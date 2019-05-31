import React from "react";
import { Link, Route } from "react-router-dom";
import LoginFormContainer from "./login_form_container";
import SignupFormContainer from "./signup_form_container";
// import FormHolder from "./form_holder";

class Formpage extends React.Component {
  componentDidMount() {
    // document
    //   .getElementsByClassName("form-img-background")
    //   .classList.add("fading-background");
  }

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
            <div className="form-image">
              <img
                className="form-img-background fading-background"
                src="https://discordapp.com/assets/fd91131ea693096d6be5e8aa99d18f9e.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="left-split">
            {/* <Link to="/" className="form-logo"> */}
            <img
              className="form-logo"
              onClick={() => this.props.history.push("/")}
              src="https://res.cloudinary.com/divtvpzuc/image/upload/v1559268535/disco-rd_logo_with_reflection.png"
              alt=""
            />
            {/* </Link> */}
            <div className="form-wrapper">{form}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default Formpage;
