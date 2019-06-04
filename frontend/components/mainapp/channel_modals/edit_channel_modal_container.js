import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EditChannelModal from "./edit_channel_modal";
import { updateChannel } from "../../../actions/channel_actions";
import { closeModal, openModal } from "../../../actions/modal_actions";

const msp = ({ entities, errors, ui }) => ({
  channels: entities.channels,
  errors: errors.channel,
  currentChannel: ui.channel
});

const mdp = dispatch => ({
  updateChannel: channel => dispatch(updateChannel(channel)),
  closeModal: () => dispatch(closeModal()),
  deleteChannel: () => dispatch(openModal("deleteChannel"))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(EditChannelModal)
);
