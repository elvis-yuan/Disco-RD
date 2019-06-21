import { connect } from "react-redux";
import DirectMessage from "./direct_message";
import { withRouter } from "react-router-dom";
import { fetchChannel } from "../../../actions/channel_actions";
import { receiveUser } from "../../../actions/user_actions";
import { currentDm } from "../../../actions/modal_actions";
import { fetchMessages } from "../../../actions/message_actions";

const msp = ({ entities, session, ui }) => {
  return {
    users: entities.users,
    channels: entities.channels,
    currentUser: entities.users[session.currentUser],
    currentUserId: session.currentUser,
    messages: entities.messages,
    currentDm: ui.currentDm,
    servers: entities.servers
  };
};
const mdp = dispatch => ({
  fetchChannel: id => dispatch(fetchChannel(id)),
  fetchUser: userId => dispatch(receiveUser(userId)),
  fetchMessages: channelId => dispatch(fetchMessages(channelId))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(DirectMessage)
);
