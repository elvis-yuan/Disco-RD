import { connect } from "react-redux";
import MessageInput from "./message_input";
import { withRouter } from "react-router-dom";

const msp = (state, ownProps) => ({
  user_id: state.session.currentUser
});

const mdp = dispatch => ({});

export default withRouter(
  connect(
    msp,
    mdp
  )(MessageInput)
);
