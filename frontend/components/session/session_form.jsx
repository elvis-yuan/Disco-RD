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
    // debugger;
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
    const redError = errors ? "red-errors" : "";
    const redBorder = errors ? "red-border" : "form-input ";
    const email =
      formType === "signup" ? (
        <div className="email-block">
          <h5 className={`form-email ${redError}`}>EMAIL</h5>
          <div className="email-input-wrapper">
            <input
              className={`${redBorder}`}
              type="text"
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
                <h5 className={`form-email ${redError}`}>USERNAME</h5>
                <div className="email-input-wrapper">
                  <input
                    className={`${redBorder}`}
                    type="text"
                    onChange={this.handleChange("username")}
                    value={this.state.username}
                  />
                </div>
              </div>
              <div className="email-block">
                <h5 className={`form-email ${redError}`}>PASSWORD</h5>
                <div className="email-input-wrapper">
                  <input
                    className={`${redBorder}`}
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
