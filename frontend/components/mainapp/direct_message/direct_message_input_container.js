import { connect } from "react-redux";
import DirectMessageInput from "./direct_message_input";
import { withRouter } from "react-router-dom";

const msp = state => ({
  user_id: state.session.currentUser
});

export default withRouter(
  connect(
    msp,
    null
  )(DirectMessageInput)
);
