import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchAllChannels } from "../../../actions/channel_actions";
import ServerIcon from "./server_icon";

const msp = (state, ownProps) => ({});

const mdp = dispatch => ({
  fetchAllChannels: serverId => dispatch(fetchAllChannels(serverId))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(ServerIcon)
);
