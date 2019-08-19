import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createChannel } from "../../../actions/channel_actions";
import CreateChannelModal from "./create_channel_modal";
import { closeModal } from "../../../actions/modal_actions";
import { deleteErrors } from "../../../actions/session_actions";

const msp = ({ errors, entities }) => {
  return {
    errors: errors.channel,
    servers: entities.servers
  };
};

const mdp = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  createChannel: channel => dispatch(createChannel(channel)),
  deleteErrors: () => dispatch(deleteErrors())
});

export default withRouter(
  connect(
    msp,
    mdp
  )(CreateChannelModal)
);
