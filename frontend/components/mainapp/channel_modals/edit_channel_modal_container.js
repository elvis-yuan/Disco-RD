import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EditChannelModal from "./edit_channel_modal";
import { updateChannel } from "../../../actions/channel_actions";

const msp = state => ({
  errors: state.errors.channel
});

const mdp = dispatch => ({
  updateChannel: channel => dispatch(updateChannel(channel))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(EditChannelModal)
);
