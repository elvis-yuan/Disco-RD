import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ChannelIndex from "./channel_index";
import { fetchAllChannels } from "../../../actions/channel_actions";

const msp = ({ entities, session }) => ({
  channels: Object.values(entities.channels),
  currentUser: entities.users[session.currentUser],
  servers: entities.servers
});

const mdp = dispatch => {
  return {
    fetchAllChannels: serverId => dispatch(fetchAllChannels(serverId))
  };
};

export default withRouter(
  connect(
    msp,
    mdp
  )(ChannelIndex)
);
