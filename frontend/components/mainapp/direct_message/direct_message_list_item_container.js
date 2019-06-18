import { connect } from "react-redux";
import { fetchMessages } from "../../../actions/message_actions";
import { currentDm } from "../../../actions/modal_actions";
import DirectMessageListItem from "./direct_message_list_item";

const mdp = dispatch => ({
  // fetchMessages: channelId => dispatch(fetchMessages(channelId)),
  // currentDm: username => dispatch(currentDm(username))
});

export default connect(
  null,
  mdp
)(DirectMessageListItem);
