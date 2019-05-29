import { connect } from "react-redux";
import { logoutUser } from "../../actions/session_actions";
import Navbar from "./navbar";
import { withRouter } from "react-router-dom";

const msp = ({ entities, session }) => ({
  currentUser: session.currentUser
});

const mdp = dispatch => ({
  logout: () => dispatch(logoutUser())
});

export default withRouter(
  connect(
    msp,
    mdp
  )(Navbar)
);
