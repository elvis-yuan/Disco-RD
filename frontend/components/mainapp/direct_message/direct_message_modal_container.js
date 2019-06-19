import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { closeModal } from "../../../actions/modal_actions";
import { createDm } from "../../../actions/directmessage_action";
import DirectMessageModal from "./direct_message_modal";

const msp = state => ({
  server_id: state.entities.directmessages.id,
  errors: state.errors.directMessage
});

const mdp = dispatch => ({
  createDm: data => dispatch(createDm(data)),
  closeModal: () => dispatch(closeModal())
});

export default withRouter(
  connect(
    msp,
    mdp
  )(DirectMessageModal)
);
