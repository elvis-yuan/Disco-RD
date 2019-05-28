import { connect } from "react-redux";
import { logoutUser } from "../../actions/session_actions";
import Navbar from "./navbar";
import { withRouter } from "react-router-dom";

const msp = ({ entities, session }) => ({
  currentUser: entities.users[session.id]
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
