import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createChannel } from "../../../actions/channel_actions";
import CreateChannelModal from "./create_channel_modal";
import { openModal, closeModal } from "../../../actions/modal_actions";

const msp = ({ errors, entities }) => ({
  errors: errors.channel,
  servers: entities.servers
});

const mdp = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  createChannel: channel => dispatch(createChannel(channel))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(CreateChannelModal)
);
