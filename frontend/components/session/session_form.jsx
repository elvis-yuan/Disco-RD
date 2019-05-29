import React from "react";
import { Link } from "react-router-dom";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.removeErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props
      .processForm(user)
      .then(() => this.props.history.push("/servers"));
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  render() {
    const { formType, errors } = this.props;
    const button = formType === "signup" ? "Continue" : "Login";
    const title = formType === "login" ? "Welcome back!" : "Create an account";

    const text =
      formType === "login" ? (
        <span className="register-text">Need an account? </span>
      ) : null;
    const usernameError =
      errors.includes("username") ||
      errors.includes("Invalid Username or Password") ||
      errors.includes("Username has already been taken")
        ? "red-errors"
        : "";
    const passwordError =
      errors.includes("password") ||
      errors.includes("Invalid Username or Password")
        ? "red-errors"
        : "";

    const emailError =
      errors.includes("email") ||
      errors.includes("Invalid Username or Password") ||
      errors.includes("Email has already been taken")
        ? "red-errors"
        : "";

    const usernameBorder =
      errors.includes("username") ||
      errors.includes("Invalid Username or Password") ||
      errors.includes("Username has already been taken")
        ? "red-border"
        : "form-input ";

    const passwordBorder =
      errors.includes("password") ||
      errors.includes("Invalid Username or Password")
        ? "red-border"
        : "form-input ";

    const emailBorder =
      errors.includes("email") ||
      errors.includes("Invalid Username or Password") ||
      errors.includes("Email has already been taken")
        ? "red-border"
        : "form-input ";

    const useremptyError = errors.includes("username") ? (
      <span className="empty-error-text">- This field is required</span>
    ) : null;

    const passwordemptyError =
      errors.includes("password") > 0 ? (
        <span className="empty-error-text">- This field is required</span>
      ) : null;

    const emailemptyError = errors.includes("email") ? (
      <span className="empty-error-text">- This field is required</span>
    ) : null;

    const incorrectFields = errors.includes("Invalid Username or Password") ? (
      <span className="empty-error-text">- Invalid Username or Password</span>
    ) : null;

    const usernameTaken = errors.includes("Username has already been taken") ? (
      <span className="empty-error-text">
        - Username has already been taken
      </span>
    ) : null;

    const emailTaken = errors.includes("Email has already been taken") ? (
      <span className="empty-error-text">- Email has already been taken</span>
    ) : null;

    const email =
      formType === "signup" ? (
        <div className="email-block">
          <h5 className={`form-email ${emailError}`}>
            EMAIL {emailemptyError} {emailTaken}
          </h5>
          <div className="email-input-wrapper">
            <input
              className={`${emailBorder}`}
              type="email"
              onChange={this.handleChange("email")}
              value={this.state.email}
            />
          </div>
        </div>
      ) : null;

    return (
      <>
        <form className="form-container">
          <div className="centering">
            <div className="form-title">{title}</div>
            {formType === "login" ? (
              <div className="form-subheading">
                We're so excited to see you again!
              </div>
            ) : null}
            <div className="form-block">
              {email}
              <div className="email-block">
                <h5 className={`form-email ${usernameError}`}>
                  USERNAME {useremptyError} {incorrectFields} {usernameTaken}
                </h5>
                <div className="email-input-wrapper">
                  <input
                    className={`${usernameBorder}`}
                    type="text"
                    onChange={this.handleChange("username")}
                    value={this.state.username}
                  />
                </div>
              </div>
              <div className="email-block">
                <h5 className={`form-email ${passwordError}`}>
                  PASSWORD {passwordemptyError} {incorrectFields}
                </h5>
                <div className="email-input-wrapper">
                  <input
                    className={`${passwordBorder}`}
                    type="password"
                    onChange={this.handleChange("password")}
                    value={this.state.password}
                  />
                </div>
              </div>
              <button className="form-button" onClick={this.handleSubmit}>
                {button}
              </button>
              <button className="form-link">
                {text}
                <Link
                  to={`/${formType === "login" ? "signup" : "login"}`}
                  className="form-link-text"
                >
                  {formType === "signup"
                    ? "Already have an account?"
                    : "Register"}
                </Link>
              </button>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default SessionForm;
