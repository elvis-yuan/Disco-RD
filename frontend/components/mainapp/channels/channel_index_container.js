import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ChannelIndex from "./channel_index";
import { fetchAllChannels } from "../../../actions/channel_actions";
import { deleteServer } from "../../../actions/server_actions";
import { fetchServer } from "../../../actions/server_actions";

const msp = ({ entities, session }) => {
  return {
    channels: entities.channels,
    currentUser: entities.users[session.currentUser],
    servers: entities.servers
  };
};

const mdp = dispatch => {
  return {
    fetchServer: serverId => dispatch(fetchServer(serverId)),
    deleteServer: serverId => dispatch(deleteServer(serverId)),
    leaveServer: serverId => dispatch(leaveServer(serverId))
  };
};

export default withRouter(
  connect(
    msp,
    mdp
  )(ChannelIndex)
);
