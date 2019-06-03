import { connect } from "react-redux";
import { deleteChannel } from "../../../actions/channel_actions";
import DeleteChannelModal from "./delete_channel_modal";
import { openModal, closeModal } from "../../../actions/modal_actions";
import { withRouter } from "react-router-dom";

const msp = ({ entities, errors, ui }) => ({
  channels: entities.channels,
  errors: errors.channel,
  currentChannel: ui.channel
});

const mdp = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  deleteChannel: channelId => dispatch(deleteChannel(channelId))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(DeleteChannelModal)
);
