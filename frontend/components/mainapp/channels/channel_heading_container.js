import { connect } from "react-redux";
import ChannelHeading from "./channel_heading";
import { withRouter } from "react-router-dom";
import { fetchChannel } from "../../../actions/channel_actions";

const msp = (state, ownProps) => {
  return {
    newChannel: state.entities.channels[ownProps.currentId]
  };
};

const mdp = dispatch => ({
  fetchChannel: channelId => dispatch(fetchChannel(channelId))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(ChannelHeading)
);
