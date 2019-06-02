import { connect } from "react-redux";
import { deleteChannel } from "../../../actions/channel_actions";
import DeleteChannelModal from "./delete_channel_modal";
import { openModal, closeModal } from "../../../actions/modal_actions";

const msp = ({ errors }) => ({
  errors: errors.channel
});

const mdp = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  deleteChannel: channel => dispatch(deleteChannel(channel))
});

export default connect(
  msp,
  mdp
)(DeleteChannelModal);
