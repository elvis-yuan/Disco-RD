import { merge } from "lodash";
import {
  RECEIVE_VIDEO_CALL,
  REMOVE_VIDEO_CALL
} from "../actions/video_call_actions";

import { CLOSE_MODAL } from "../actions/modal_actions";

const videoCallReducer = (state = null, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VIDEO_CALL:
      return action.payload;
    case REMOVE_VIDEO_CALL:
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
};

export default videoCallReducer;
