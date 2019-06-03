import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ChannelIndex from "./channel_index";
import { fetchAllChannels } from "../../../actions/channel_actions";
import { deleteServer } from "../../../actions/server_actions";

const msp = ({ entities, session }) => {
  debugger;
  return {
    channels: entities.channels,
    currentUser: entities.users[session.currentUser],
    servers: entities.servers
  };
};

const mdp = dispatch => {
  return {
    fetchAllChannels: serverId => dispatch(fetchAllChannels(serverId)),
    deleteServer: serverId => dispatch(deleteServer(serverId))
  };
};

export default withRouter(
  connect(
    msp,
    mdp
  )(ChannelIndex)
);
