import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import VideoCall from "./video_call";
import { closeModal } from "../../../actions/modal_actions";

const msp = ({ entities, ui }) => {
  return {
    videoCall: ui.videoCall
  };
};

const mdp = dispatch => ({
  closeModal: () => dispatch(closeModal())
});

export default withRouter(
  connect(
    msp,
    mdp
  )(VideoCall)
);
