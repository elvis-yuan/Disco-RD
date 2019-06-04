import { connect } from "react-redux";
import ChannelChat from "./channel_chat";
import { withRouter } from "react-router-dom";
import { fetchChannel } from "../../../actions/channel_actions";
import { receiveUser } from "../../../actions/user_actions";

const msp = ({ entities, session }) => {
  return {
    channels: entities.channels,
    currentUser: entities.users[session.currentUser],
    currentUserId: session.currentUser,
    messages: entities.messages
  };
};
const mdp = dispatch => ({
  fetchChannel: id => dispatch(fetchChannel(id)),
  fetchUser: userId => dispatch(receiveUser(userId))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(ChannelChat)
);
