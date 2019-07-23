import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ChannelIndex from "./channel_index";
import { deleteServer } from "../../../actions/server_actions";
import { fetchServer } from "../../../actions/server_actions";
import { openModal, closeModal } from "../../../actions/modal_actions";

const msp = ({ entities, session, ui }) => {
  return {
    channels: entities.channels,
    currentUser: entities.users[session.currentUser],
    currentUserId: session.currentUser,
    servers: entities.servers,
    currentChannel: ui.channel,
    modal: ui.modal
  };
};

const mdp = dispatch => {
  return {
    fetchServer: serverId => dispatch(fetchServer(serverId)),
    deleteServer: serverId => dispatch(deleteServer(serverId)),
    leaveServer: serverId => dispatch(leaveServer(serverId)),
    createModal: () => dispatch(openModal("createChannel")),
    editServer: () => dispatch(openModal("editServer")),
    closeModal: () => dispatch(closeModal())
  };
};

export default withRouter(
  connect(
    msp,
    mdp
  )(ChannelIndex)
);
