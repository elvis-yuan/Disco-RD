import { connect } from "react-redux";
import Video from "./video";
import {
  receiveVideoCall,
  removeVideoCall
} from "../../../actions/video_call_actions";

const mdp = dispatch => ({
  receiveVideoCall: payload => dispatch(receiveVideoCall(payload)),
  removeVideoCall: () => dispatch(removeVideoCall())
});

export default connect(
  null,
  mdp
)(Video);
