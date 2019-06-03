import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../../../actions/session_actions";
import LogoutModal from "./logout_modal";
import { closeModal } from "../../../actions/modal_actions";

const msp = ({ session }) => ({
  currentUser: session.currentUser
});

const mdp = dispatch => ({
  logoutUser: () => dispatch(logoutUser()).then(() => dispatch(closeModal()))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(LogoutModal)
);
