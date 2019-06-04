import { connect } from "react-redux";
import CreateServerModal from "./create_server_modal";
import { closeModal, openModal } from "../../../actions/modal_actions";
import { createServer } from "../../../actions/server_actions";
import { withRouter } from "react-router-dom";
import { deleteErrors } from "../../../actions/session_actions";
import { fetchAllChannels } from "../../../actions/channel_actions";

const msp = ({ errors }) => ({
  errors: errors.server
});

const mdp = dispatch => ({
  createServer: server => dispatch(createServer(server)),
  mainModal: () => dispatch(openModal("main")),
  openModal: modal => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal()),
  fetchAllChannels: serverId => dispatch(fetchAllChannels(serverId)),
  removeErrors: () => dispatch(deleteErrors())
});

export default withRouter(
  connect(
    msp,
    mdp
  )(CreateServerModal)
);
