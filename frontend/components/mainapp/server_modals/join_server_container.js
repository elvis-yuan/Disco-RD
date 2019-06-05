import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { closeModal, openModal } from "../../../actions/modal_actions";
import JoinServerModal from "./join_server_modal";
import { joinServer } from "../../../actions/server_actions";
import { deleteErrors } from "../../../actions/session_actions";
import { fetchAllChannels } from "../../../actions/channel_actions";

const msp = ({ errors, entities }) => ({
  servers: entities.servers,
  errors: errors.server
});

const mdp = dispatch => ({
  joinServer: server => dispatch(joinServer(server)),
  mainModal: () => dispatch(openModal("main")),
  closeModal: () => dispatch(closeModal()),
  removeErrors: () => dispatch(deleteErrors()),
  fetchAllChannels: serverId => dispatch(fetchAllChannels(serverId))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(JoinServerModal)
);
