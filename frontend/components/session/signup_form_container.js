import SessionForm from "./session_form";
import { connect } from "react-redux";
import {
  signupUser,
  deleteErrors,
  loginUser
} from "../../actions/session_actions";
import { withRouter } from "react-router-dom";

const msp = state => ({
  errors: state.errors.session.responseJSON,
  formType: "signup"
});

const mdp = dispatch => ({
  processForm: user => dispatch(signupUser(user)),
  // login: user => dispatch(loginUser(user)),
  removeErrors: () => dispatch(deleteErrors())
});

export default withRouter(
  connect(
    msp,
    mdp
  )(SessionForm)
);
