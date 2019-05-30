import { withRouter } from "react-router-dom";
import LoginFormContainer from "./login_form_container";
import SignupFormContainer from "./signup_form_container";
import React from "react";

const FormHolder = props => {
  const form =
    props.match.path === "/login" ? (
      <LoginFormContainer />
    ) : (
      <SignupFormContainer />
    );
  return form;
};

export default withRouter(FormHolder);
