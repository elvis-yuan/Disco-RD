import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchAllChannels } from "../../../actions/channel_actions";
import ServerIcon from "./server_icon";
import { fetchAllServers, fetchServer } from "../../../actions/server_actions";

const msp = (state, ownProps) => ({});

const mdp = dispatch => ({
  // fetchAllChannels: serverId => dispatch(fetchAllChannels(serverId)),
  fetchServer: serverId => dispatch(fetchServer(serverId))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(ServerIcon)
);
