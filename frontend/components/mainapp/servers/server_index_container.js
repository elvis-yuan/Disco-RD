import { connect } from "react-redux";
import { fetchAllServers, fetchServer } from "../../../actions/server_actions";
import { logoutUser } from "../../../actions/session_actions";
import { withRouter, Link } from "react-router-dom";
import ServerIndex from "./server_index";
import { openModal } from "../../../actions/modal_actions";
import {
  receiveUser,
  receiveData,
  removeData
} from "../../../actions/user_actions";
import {
  receiveChannel,
  removeChannel,
  channelAppeared,
  channelDisappeared
} from "../../../actions/channel_actions";
import { serverDisappeared } from "../../../actions/server_actions";

const msp = ({ entities, session, ui }) => {
  return {
    directMessageId: entities.users[session.currentUser].direct_message_id,
    currentUser: session.currentUser,
    prevUser: session.prevUser,
    servers: entities.servers,
    modalOpen: ui.modal ? ["join", "main", "create"].includes(ui.modal) : false
  };
};

const mdp = dispatch => ({
  fetchAllServers: userId => dispatch(fetchAllServers(userId)),
  fetchServer: id => dispatch(fetchServer(id)),
  receiveData: data => dispatch(receiveData(data)),
  removeData: data => dispatch(removeData(data)),
  receiveUser: user => dispatch(receiveUser(user)),
  channelDisappeared: channel => dispatch(channelDisappeared(channel)),
  channelAppeared: channel => dispatch(channelAppeared(channel)),
  removeChannel: channel => dispatch(removeChannel(channel)),
  logoutUser: () => dispatch(logoutUser()),
  mainModal: () => dispatch(openModal("main")),
  logoutModal: () => dispatch(openModal("logoutUser")),
  serverDisappeared: server => dispatch(serverDisappeared(server))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(ServerIndex)
);
